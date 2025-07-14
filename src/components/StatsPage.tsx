import React from "react";
import { getShortUrls } from "../utils/storage";
import { Box, Typography } from "@mui/material";

interface ShortUrl {
    longUrl: string;
    shortCode: string;
    expiry: string;
    createdAt: string;
}

const StatsPage: React.FC = () => {
  const urls = getShortUrls();

  return (
    <Box>
      <Typography variant="h6">Shortened URLs</Typography>
      {urls.map((url: ShortUrl, idx: number) => (
        <Box key={idx} mb={2}>
          <Typography>Short URL: http://localhost:3000/{url.shortCode}</Typography>
          <Typography>Original: {url.longUrl}</Typography>
          <Typography>Created: {url.createdAt}</Typography>
          <Typography>Expires: {url.expiry}</Typography>
          {/* Simulate click stats */}
          <Typography>Clicks: 0</Typography>
        </Box>
      ))}
    </Box>
  );
};

export default StatsPage;
