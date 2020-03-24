const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");
const port = 9000;

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, 'client')));

app.all('/api/mainSong', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3003"
  });
});

app.all('/songData', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3001"
  });
});

app.listen(port, () => console.log(`CAN YOU HEAR ME @ ${port}`));



// const express = require('express');
// const app = express();
// const path = require('path');
// const cors = require('cors');
// const { createProxyMiddleware } = require('http-proxy-middleware');
// const port = 9000;

// const { routes } = require('./config.json');

// app.use(cors());
// app.use(express.static(path.join(__dirname, 'client')));

// for (route of routes) {
//   app.use(route.route,
//     createProxyMiddleware({
//       target: route.address,
//       pathRewrite: (path, req) => {
//         return path.split('/').slice(2).join('/'); 
//       }
//     })
//   );
// }

// app.listen(port, () => console.log(`CAN YOU HEAR ME @ ${port}`));