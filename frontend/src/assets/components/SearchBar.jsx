// frontend/src/assets/components/SearchBar.jsx

import React from 'react';
import { TextField, Box } from '@mui/material';

const SearchBar = ({ searchQuery, setSearchQuery, handleSearch }) => {
  return (
    <Box display="flex" justifyContent="center" margin="20px">
      <TextField
        label="Search by City/District/State/Country"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyPress={(e) => {
          if (e.key === 'Enter') handleSearch();
        }}
        style={{ width: '50%' }}
      />
    </Box>
  );
};

export default SearchBar;
