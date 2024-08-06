const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Use CORS middleware to handle CORS
app.use(cors());

// Proxy endpoint for all products
app.use('/api', createProxyMiddleware({
  target: 'https://course-api.com',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to target
  },
  onProxyReq: (proxyReq, req, res) => {
    // Optionally log request details for debugging
    console.log(`Proxying request to: ${proxyReq.path}`);
  },
  onProxyRes: (proxyRes, req, res) => {
    // Optionally log response details for debugging
    console.log(`Received response from target: ${proxyRes.statusCode}`);
  },
}));

app.listen(3000, () => {
  console.log('Proxy server is running on http://localhost:3000');
});
