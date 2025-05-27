const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

// Basit health check
app.get('/', (req, res) => {
  res.send('MCP Crypto API is running');
});

// /price?coin=bitcoin
app.get('/price', async (req, res) => {
  const coin = req.query.coin || 'bitcoin';
  try {
    const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
      params: {
        ids: coin,
        vs_currencies: 'usd',
      },
    });
    res.json({
      coin,
      price: response.data[coin]?.usd || null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch price' });
  }
});

// MCP JSON-RPC endpoint
app.post('/rpc', express.json(), async (req, res) => {
  const { method, params, id } = req.body;

  if (method === 'initialize') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: {
        name: 'Crypto MCP',
        description: 'CoinGecko üzerinden kripto fiyatı sorgulayan MCP agent',
        version: '1.0.0',
      },
    });
  }

  if (method === 'tools/list') {
    return res.json({
      jsonrpc: '2.0',
      id,
      result: [
        {
          name: 'get_price',
          description: 'Belirtilen coin için USD fiyatını döner',
          params: [
            { name: 'coin', type: 'string', required: true, description: 'Coin ismi (ör: bitcoin)' },
          ],
        },
      ],
    });
  }

  if (method === 'tools/call') {
    const { tool, args } = params;
    if (tool === 'get_price') {
      const coin = args.coin || 'bitcoin';
      try {
        const response = await axios.get(`https://api.coingecko.com/api/v3/simple/price`, {
          params: {
            ids: coin,
            vs_currencies: 'usd',
          },
        });
        return res.json({
          jsonrpc: '2.0',
          id,
          result: {
            coin,
            price: response.data[coin]?.usd || null,
          },
        });
      } catch (error) {
        return res.json({
          jsonrpc: '2.0',
          id,
          error: { code: -32000, message: 'Failed to fetch price' },
        });
      }
    }
  }

  // Desteklenmeyen method
  res.json({
    jsonrpc: '2.0',
    id,
    error: { code: -32601, message: 'Method not found' },
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 