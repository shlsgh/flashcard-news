// frontend/src/App.jsx

import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { Box, Grid, Typography, IconButton, AppBar, Toolbar } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Import custom components
import SearchBar from './assets/components/SearchBar.jsx';
import NewsCard from './assets/components/NewsCard.jsx';
import NewsPopup from './assets/components/NewsPopup.jsx';

function App() {
  const API_URL = import.meta.env.VITE_API_URL;
  const [newsList, setNewsList] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedNews, setSelectedNews] = useState(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [mode, setMode] = useState('dark'); // Default to dark mode

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mode,  // toggles dark/light mode
          background: {
            default: mode === 'dark' ? '#121212' : '#f5f5f5'
          }
        }
      }),
    [mode]
  );

  const fetchNews = async (query = '') => {
    try {
      // Make a GET request to our backend with an optional `location` query param
      const res = await axios.get(`${API_URL}/api/news`, {
        params: { location: query }
      });
      // console.log('Fetched news:', res.data);
      setNewsList(res.data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  // Fetch top headlines initially
  useEffect(() => {
    fetchNews();
  }, []);

  const handleSearch = () => {
    fetchNews(searchQuery);
  };

  const handleCardClick = (news) => {
    setSelectedNews(news);
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
    setSelectedNews(null);
  };

  // Toggle between dark and light modes
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ minHeight: '100vh', bgcolor: 'background.default', color: 'text.primary' }}>
        <AppBar position="static" color="default" elevation={0} sx={{ background: 'transparent' }}>
          <Toolbar>
            <Typography variant="h6" sx={{ flexGrow: 1 }}>
              News Portal
            </Typography>
            <IconButton onClick={toggleColorMode} color="inherit">
              {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Toolbar>
        </AppBar>

        <SearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          handleSearch={handleSearch}
        />

        <Grid container justifyContent="center" spacing={2}>
          {newsList.map((news) => (
            <Grid item key={news.id}>
              <NewsCard news={news} onClick={handleCardClick} />
            </Grid>
          ))}
        </Grid>

        <NewsPopup open={popupOpen} handleClose={handleClosePopup} news={selectedNews} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
