require("dotenv").config();
const express = require("express");
const axios = require("axios");
const cors = require("cors");

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

//  error handling
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  res
    .status(500)
    .json({ message: "Internal server error", error: err.message });
});

// Validate environment variables
const requiredEnvVars = ["RAPIDAPI_KEY"];
const missingEnvVars = requiredEnvVars.filter(
  (varName) => !process.env[varName]
);

if (missingEnvVars.length > 0) {
  console.error(
    `Missing required environment variables: ${missingEnvVars.join(", ")}`
  );
  console.error("Please check your .env file");
  process.exit(1);
}

// Constants
const RAPIDAPI_BASE_URL = "https://basketball-head.p.rapidapi.com";
const RAPIDAPI_HEADERS = {
  "x-rapidapi-key": process.env.RAPIDAPI_KEY,
  "x-rapidapi-host": "basketball-head.p.rapidapi.com",
  "Content-Type": "application/json",
};

// Helper function to make API requests with better error handling
async function makeRapidAPIRequest(url, options = {}) {
  try {
    const response = await axios({
      url,
      timeout: 10000, // 10 second timeout
      ...options,
      headers: {
        ...RAPIDAPI_HEADERS,
        ...options.headers,
      },
    });
    return response.data;
  } catch (error) {
    console.error("RapidAPI request failed:", {
      url,
      status: error.response?.status,
      statusText: error.response?.statusText,
      message: error.message,
      data: error.response?.data,
    });

    if (error.response?.status === 429) {
      throw new Error("API rate limit exceeded. Please try again later.");
    } else if (error.response?.status === 401) {
      throw new Error("Invalid API key. Please check your RapidAPI key.");
    } else if (error.response?.status >= 500) {
      throw new Error("API service temporarily unavailable.");
    }

    throw error;
  }
}

// #1. Fetch NBA scores from ESPN API
app.get("/api/nba-scores", async (req, res) => {
  try {
    const response = await axios.get(
      "https://site.api.espn.com/apis/site/v2/sports/basketball/nba/scoreboard",
      { timeout: 10000 }
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching NBA Scores:", error.message);
    res.status(500).json({
      message: "Failed to fetch current scores",
      error: error.message,
    });
  }
});

// #2. Search for player by name
app.post("/api/player-search", async (req, res) => {
  try {
    const { firstName, lastName } = req.body;

    // Input validation
    if (!firstName || !lastName) {
      return res.status(400).json({
        message: "Both firstName and lastName are required.",
        example: { firstName: "LeBron", lastName: "James" },
      });
    }

    if (typeof firstName !== "string" || typeof lastName !== "string") {
      return res.status(400).json({
        message: "firstName and lastName must be strings.",
      });
    }

    console.log(`Searching for player: ${firstName} ${lastName}`);

    const searchData = await makeRapidAPIRequest(
      `${RAPIDAPI_BASE_URL}/players/search`,
      {
        method: "POST",
        data: {
          firstname: firstName.trim().toLowerCase(), // Changed to lowercase
          lastname: lastName.trim().toLowerCase(), // Changed to lowercase
          pageSize: 100,
        },
      }
    );

    const players = searchData?.body || [];

    if (players.length === 0) {
      return res.status(404).json({
        message: `No player found with name: ${firstName} ${lastName}`,
        suggestion:
          "Try checking the spelling or using a different name format.",
      });
    }

    // Return all matching players
    res.json({
      success: true,
      count: players.length,
      players: players.map((player) => ({
        playerId: player.playerId,
        firstName: player.firstName,
        lastName: player.lastName,
        teamName: player.teamName,
        position: player.position,
        headshotUrl: player.headshotUrl,
        jerseyNumber: player.jerseyNumber,
      })),
    });
  } catch (error) {
    console.error("Error searching for player:", error.message);
    res.status(error.message.includes("rate limit") ? 429 : 500).json({
      message: "Player search failed.",
      error: error.message,
    });
  }
});

// #3. Fetch player stats by ID
app.get("/api/player-stats/:playerId", async (req, res) => {
  try {
    const { playerId } = req.params;
    const { seasonType = "Regular" } = req.query;

    // Input validation
    if (!playerId || isNaN(playerId)) {
      return res.status(400).json({
        message: "Valid numeric playerId is required.",
      });
    }

    console.log(
      `Fetching stats for player ID: ${playerId}, season type: ${seasonType}`
    );

    const statsData = await makeRapidAPIRequest(
      `${RAPIDAPI_BASE_URL}/players/${playerId}/stats/PerGame`,
      {
        method: "GET",
        params: { seasonType },
      }
    );

    res.json({
      success: true,
      playerId: parseInt(playerId),
      seasonType,
      stats: statsData,
    });
  } catch (error) {
    console.error("Error fetching player stats:", error.message);
    res.status(error.message.includes("rate limit") ? 429 : 500).json({
      message: "Failed to fetch player stats.",
      error: error.message,
    });
  }
});

// #4. Combined route: Search player by name and return complete data
app.post("/api/player-full-data", async (req, res) => {
  try {
    const { firstName, lastName, seasonType = "Regular" } = req.body;

    // Input validation
    if (!firstName || !lastName) {
      return res.status(400).json({
        message: "Both firstName and lastName are required.",
        example: {
          firstName: "LeBron",
          lastName: "James",
          seasonType: "Regular",
        },
      });
    }

    console.log(`Fetching full data for: ${firstName} ${lastName}`);

    // Step 1: Search for player
    const searchData = await makeRapidAPIRequest(
      `${RAPIDAPI_BASE_URL}/players/search`,
      {
        method: "POST",
        data: {
          firstname: firstName.trim().toLowerCase(), // Changed to lowercase
          lastname: lastName.trim().toLowerCase(), // Changed to lowercase
          pageSize: 100,
        },
      }
    );

    console.log("Raw search response:", JSON.stringify(searchData, null, 2));

    // Handle different possible response structures
    let players = [];
    if (searchData?.body && Array.isArray(searchData.body)) {
      players = searchData.body;
    } else if (searchData?.players && Array.isArray(searchData.players)) {
      players = searchData.players;
    } else if (searchData?.data && Array.isArray(searchData.data)) {
      players = searchData.data;
    } else if (Array.isArray(searchData)) {
      players = searchData;
    }

    console.log("Extracted players:", players);

    if (players.length === 0) {
      return res.status(404).json({
        message: `No player found with name: ${firstName} ${lastName}`,
        debug: {
          searchData: searchData,
          searchDataKeys: Object.keys(searchData || {}),
          searchDataType: typeof searchData,
        },
      });
    }

    const player = players[0]; // Get the first matching player
    console.log("Selected player:", JSON.stringify(player, null, 2));

    // Check for different possible ID field names
    let playerId =
      player.playerId || player.id || player.player_id || player.Id;

    if (!playerId) {
      console.log("Available player fields:", Object.keys(player));
      return res.status(404).json({
        message: "Player ID not found in response",
        debug: {
          availableFields: Object.keys(player),
          playerData: player,
        },
      });
    }

    console.log("Using player ID:", playerId);

    // Step 2: Fetch player stats
    const statsData = await makeRapidAPIRequest(
      `${RAPIDAPI_BASE_URL}/players/${playerId}/stats/PerGame`,
      {
        method: "GET",
        params: { seasonType },
      }
    );

    console.log("Stats data:", JSON.stringify(statsData, null, 2));

    // Step 3: Combine player info and stats
    const combinedData = {
      success: true,
      player: {
        playerId: playerId,
        firstName: player.firstName || player.first_name || firstName,
        lastName: player.lastName || player.last_name || lastName,
        fullName: `${player.firstName || firstName} ${
          player.lastName || lastName
        }`,
        teamName: player.teamName || player.team_name || player.team || "N/A",
        position: player.position || player.pos || "N/A",
        headshotUrl:
          player.headshotUrl || player.headshot_url || player.image || null,
        jerseyNumber:
          player.jerseyNumber || player.jersey_number || player.number || "N/A",
      },
      stats: statsData,
      seasonType,
      searchInfo: {
        totalMatchingPlayers: players.length,
        selectedPlayer: 1,
      },
    };

    res.json(combinedData);
  } catch (error) {
    console.error("Error fetching full player data:", error.message);
    console.error("Error stack:", error.stack);
    res.status(error.message.includes("rate limit") ? 429 : 500).json({
      message: "Failed to get full player data.",
      error: error.message,
    });
  }
});

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || "development",
  });
});

// Handle 404s
app.use("*", (req, res) => {
  res.status(404).json({
    message: "Route not found",
    availableRoutes: [
      "GET /api/nba-scores",
      "POST /api/player-search",
      "GET /api/player-stats/:playerId",
      "POST /api/player-full-data",
      "GET /api/health",
    ],
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`🏀 NBA API Server running at http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`Available endpoints:`);
  console.log(`  GET  /api/nba-scores`);
  console.log(`  POST /api/player-search`);
  console.log(`  GET  /api/player-stats/:playerId`);
  console.log(`  POST /api/player-full-data`);
  console.log(`  GET  /api/health`);
});
