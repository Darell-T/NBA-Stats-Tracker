# 🏀 NBA Stats Tracker

A full-stack web application for tracking NBA games, standings, and player statistics with real-time data integration.

## 🎯 Features

### Current Features
- **Live Game Scores** - Real-time NBA game updates with team logos and broadcast information
- **League Standings** - Eastern and Western Conference standings with win percentages(standings will update when new season starts)
- **Player Search** - Detailed player statistics including PPG, APG, RPG, and shooting percentages
- **Theme Toggle** - Dark/Light mode with smooth transitions and CSS animations
- **Responsive Design** - Optimized for desktop and mobile devices
- **Real-time Updates** - Automatic data refresh every 30 seconds

### 🚧 Coming Soon (In Development)
- **User Authentication** - Sign up/login functionality with JWT tokens
- **Favorites System** - Save and track your favorite players and teams
- **User Dashboard** - Personalized view of favorite players' stats and team news
- **Historical Data** - Player season comparisons and historical performance
- **Push Notifications** - Game alerts and player milestone notifications

## 🚀 Tech Stack

### Frontend
- **React 18** - Modern hooks-based components
- **CSS3** - Custom animations, gradients, and responsive design
- **Axios** - HTTP client for API requests
- **React Icons** - Consistent icon library

### Backend
- **Node.js/Express.js** - RESTful API server
- **Multiple API Integrations**:
  - ESPN API for live scores and standings
  - RapidAPI (Basketball Head) for detailed player statistics
- **Environment Variables** - Secure API key management
- **Comprehensive Error Handling** - Rate limiting, timeouts, and fallback responses



## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- RapidAPI account for basketball statistics

### Backend Setup
```bash
# Clone the repository
git clone https://github.com/Darell-T/NBA-Stats-Tracker
cd NBA-Stats-Tracker/backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Add your RapidAPI key to .env
RAPIDAPI_KEY=your_rapidapi_key_here
PORT=5000

# Start the backend server
npm start
# Server runs on http://localhost:5000
```

### Frontend Setup
```bash
# Navigate to project root
cd ../

# Install frontend dependencies
npm install

# Start development server
npm run dev
# Frontend runs on http://localhost:5173
```

### Environment Variables
Create a `.env` file in the `/backend` directory:
```env
RAPIDAPI_KEY=your_rapidapi_key_here
PORT=5000
NODE_ENV=development
```

## 📡 API Endpoints

### Game & Standings Data
- `GET /api/nba-scores` - Current NBA game scores and schedules
- `GET /api/standings` - Eastern and Western Conference standings
- `GET /api/health` - Server health check

### Player Statistics
- `POST /api/player-search` - Search players by first and last name
- `GET /api/player-stats/:playerId` - Individual player statistics
- `POST /api/player-full-data` - Combined player info and stats

### Request/Response Examples
```javascript
// Player Search Request
POST /api/player-search
{
  "firstName": "LeBron",
  "lastName": "James"
}

// Response
{
  "success": true,
  "count": 1,
  "players": [{
    "playerId": 2544,
    "firstName": "LeBron",
    "lastName": "James",
    "teamName": "Los Angeles Lakers",
    "position": "SF",
    "headshotUrl": "...",
    "jerseyNumber": "6"
  }]
}
```

## 🎨 UI/UX Features

### Design Elements
- **Glassmorphism Effects** - Modern blur effects and transparency
- **Smooth Animations** - Hover states, transitions, and loading spinners
- **Responsive Grid Layouts** - CSS Grid and Flexbox implementations
- **Interactive Components** - Modal overlays, dropdown menus, and form validations

### Theme System
- Dynamic CSS variables for consistent theming
- Smooth color transitions across all components




## 📞 Contact

**Darell Thompson** - [LinkedIn](https://www.linkedin.com/in/darell-thompson-1097691b1/)

**Project Link**: [NBA-Stats-Tracker](https://github.com/Darell-T/NBA-Stats-Tracker)

⭐ **Star this repository if you found it helpful!**
