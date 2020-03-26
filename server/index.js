const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");
const port = 9000;

const proxy = httpProxy.createProxyServer({});

app.use(cors());
app.use(express.static(path.join(__dirname, '../client')));

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

app.all('/songs', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:3131"
  })
});

app.all('/api/*', (req, res) => {
  proxy.web(req, res, {
    target: "http://localhost:4001"
  })
});

app.listen(port, () => console.log(`CAN YOU HEAR ME @ ${port}`));