# Flashcard News 📰

A project using Express Js + React + Material UI with real-time news via NewsAPI.

## Features

- Search news by location
- Light/dark mode toggle
- Card-based UI with detailed popups
- News fetched using NewsAPI
- Separate frontend and backend folders

## Setup

### Backend
```bash
cd backend
npm install
echo "PORT=port_for_api" > .env
echo "NEWS_API_KEY=your_key_here" > .env
npm start
```

### Frontend
```bash
cd frontend
npm install
echo "VITE_API_URL=backend_api_url" > .env
npm run dev
```
