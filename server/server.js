const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors')
const app = express();
app.use(cors())
const target = 'https://data.nasdaq.com';

const apiProxy = createProxyMiddleware('/api', {
  target,
  changeOrigin: true, 
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
 },
});

app.use('/api', apiProxy);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});