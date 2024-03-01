// frontend/src/assets/components/NewsCard.jsx

import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActionArea
} from '@mui/material';

const NewsCard = ({ news, onClick }) => {
//   const formattedDate = news.publishedAt
//     ? new Date(news.publishedAt).toLocaleDateString(undefined, {
//         year: 'numeric',
//         month: 'long',
//         day: 'numeric'
//       })
//     : 'date comes here';
    const formattedDate = 'date here';
    
    // console.log(`hi${news.publishedAt}`);

  return (
    <Card sx={{ maxWidth: 345, margin: '10px' }} onClick={() => onClick(news)}>
      <CardActionArea>
        {news.imageURL && (
          <CardMedia
            component="img"
            height="140"
            image={news.imageURL}
            alt={news.title}
          />
        )}
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {news.title}
          </Typography>
          {formattedDate && (
            <Typography variant="caption" color="text.secondary" display="block">
              {formattedDate}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            {news.snippet}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default NewsCard;
