// frontend/src/components/ShortenerForm.jsx
import React, { useState } from 'react';
import {
  Box, TextField, Button, Typography, Paper, Grid
} from '@mui/material';
import axios from 'axios';

const ShortenerForm = () => {
  const [urls, setUrls] = useState([{ url: '', validity: '', shortcode: '' }]);
  const [results, setResults] = useState([]);

  const handleChange = (index, field, value) => {
    const newUrls = [...urls];
    newUrls[index][field] = value;
    setUrls(newUrls);
  };

  const addField = () => {
    if (urls.length < 5) {
      setUrls([...urls, { url: '', validity: '', shortcode: '' }]);
    }
  };

  const handleSubmit = async () => {
    const newResults = [];

    for (let i = 0; i < urls.length; i++) {
      const { url, validity, shortcode } = urls[i];

      if (!url || !url.startsWith('http')) {
        alert(`Please enter a valid URL in row ${i + 1}`);
        return;
      }

      try {
        const res = await axios.post('http://localhost:8000/shorturls', {
          url,
          validity: validity ? parseInt(validity) : undefined,
          shortcode: shortcode || undefined
        });

        newResults.push({
          original: url,
          shortLink: res.data.shortLink,
          expiry: res.data.expiry
        });
      } catch (err) {
        console.error(err);
        alert(`Failed to shorten URL in row ${i + 1}`);
      }
    }

    setResults(newResults);
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        URL Shortener
      </Typography>

      {urls.map((item, index) => (
        <Paper key={index} sx={{ p: 2, mb: 2 }} elevation={3}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={5}>
              <TextField
                label="Long URL"
                fullWidth
                value={item.url}
                onChange={(e) => handleChange(index, 'url', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={3}>
              <TextField
                label="Validity (min)"
                fullWidth
                type="number"
                value={item.validity}
                onChange={(e) => handleChange(index, 'validity', e.target.value)}
              />
            </Grid>
            <Grid item xs={6} md={4}>
              <TextField
                label="Custom Shortcode"
                fullWidth
                value={item.shortcode}
                onChange={(e) => handleChange(index, 'shortcode', e.target.value)}
              />
            </Grid>
          </Grid>
        </Paper>
      ))}

      <Box sx={{ mt: 2 }}>
        <Button variant="outlined" onClick={addField} disabled={urls.length >= 5}>
          + Add Another
        </Button>
        <Button variant="contained" sx={{ ml: 2 }} onClick={handleSubmit}>
          Generate Short Links
        </Button>
      </Box>

      {results.length > 0 && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6">Shortened URLs:</Typography>
          {results.map((item, i) => (
            <Paper key={i} sx={{ p: 2, my: 1 }} elevation={2}>
              <Typography><strong>Original:</strong> {item.original}</Typography>
              <Typography><strong>Short:</strong> <a href={item.shortLink} target="_blank" rel="noreferrer">{item.shortLink}</a></Typography>
              <Typography><strong>Expires At:</strong> {item.expiry}</Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default ShortenerForm;
