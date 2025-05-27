const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());

// Agent health check
app.get('/', (req, res) => {
  res.send('Agent is running');
});

// /agent/price?coin=bitcoin
app.get('/agent/price', async (req, res) => {
  const coin = req.query.coin || 'bitcoin';
  try {
    // MCP backend'e istek at
    const response = await axios.get(`http://localhost:3000/price?coin=${coin}`);
    res.json({
      agent: true,
      ...response.data,
    });
  } catch (error) {
    res.status(500).json({ error: 'Agent failed to fetch price' });
  }
});

app.listen(PORT, () => {
  console.log(`Agent running on port ${PORT}`);
}); 