// frontend/src/components/StatsPage.jsx
import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Divider
} from '@mui/material';
import axios from 'axios';

const StatsPage = () => {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  const handleFetch = async () => {
    if (!shortcode) {
      alert("Please enter a shortcode.");
      return;
    }

    try {
      const res = await axios.get(`http://localhost:8000/shorturls/${shortcode}`);
      setStats(res.data);
    } catch (err) {
      console.error(err);
      alert("Could not fetch stats for this shortcode.");
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Statistics
      </Typography>

      <Box sx={{ mb: 3 }}>
        <TextField
          label="Enter Shortcode"
          variant="outlined"
          value={shortcode}
          onChange={(e) => setShortcode(e.target.value)}
          sx={{ mr: 2 }}
        />
        <Button variant="contained" onClick={handleFetch}>
          Get Stats
        </Button>
      </Box>

      {stats && (
        <Paper sx={{ p: 3 }} elevation={3}>
          <Typography variant="h6" gutterBottom>
            Link Details
          </Typography>
          <Typography><strong>Original URL:</strong> {stats.originalUrl}</Typography>
          <Typography><strong>Created At:</strong> {stats.createdAt}</Typography>
          <Typography><strong>Expires At:</strong> {stats.expiry}</Typography>
          <Typography><strong>Total Clicks:</strong> {stats.clicks.length}</Typography>

          <Divider sx={{ my: 2 }} />
          <Typography variant="h6">Click Details:</Typography>

          {stats.clicks.map((click, index) => (
            <Paper key={index} sx={{ p: 2, mb: 2 }} variant="outlined">
              <Typography><strong>Time:</strong> {click.timestamp}</Typography>
              <Typography><strong>Referrer:</strong> {click.referrer || 'Unknown'}</Typography>
              <Typography><strong>Location:</strong> {click.location || 'Unknown'}</Typography>
            </Paper>
          ))}
        </Paper>
      )}
    </Box>
  );
};

export default StatsPage;

