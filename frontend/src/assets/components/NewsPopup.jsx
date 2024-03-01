// frontend/src/assets/components/NewsPopup.jsx

import React from 'react';
import { Modal, Box, Typography, CardMedia, IconButton, Button } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4
};

const NewsPopup = ({ open, handleClose, news }) => {
  if (!news) return null;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="news-popup-title"
      aria-describedby="news-popup-content"
    >
      <Box sx={style}>
        {/* Header Section */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography id="news-popup-title" variant="h6" component="h2">
            {news.title}
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Published Date Section */}
        {news.publishedAt && (
          <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1 }}>
            {new Date(news.publishedAt).toLocaleString()}
          </Typography>
        )}

        {/* Image Section */}
        {news.imageURL && (
          <CardMedia
            component="img"
            height="250"
            image={news.imageURL}
            alt={news.title}
            sx={{ marginTop: 2 }}
          />
        )}

        {/* Content Section */}
        <Typography id="news-popup-content" sx={{ mt: 2 }}>
          {news.content && !news.content.includes('[+')
            ? news.content
            : news.snippet || 'No summary available.'}
        </Typography>

        {/* Link to Full Article */}
        {news.url && (
          <Button
            href={news.url}
            target="_blank"
            rel="noopener noreferrer"
            variant="outlined"
            sx={{ mt: 2 }}
          >
            Read Full Article
          </Button>
        )}
      </Box>
    </Modal>
  );
};

export default NewsPopup;
