const express = require("express");
const app = express();
const path = require("path");
const cors = require("cors");
const httpProxy = require("http-proxy");
const port = 9000;

const proxy = httpProxy.createProxyServer({});

app.use(cors({
  origin: true,
  credentials: true,
}));

app.use(express.static(path.join(__dirname, '../client')));

app.all('/api/mainSong', (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-144-8-70.us-west-1.compute.amazonaws.com:3003"
  });
});

// app.get('/api/mainSong', (req, res) => {
//   res.redirect("http://ec2-18-144-8-70.us-west-1.compute.amazonaws.com:3003/api/mainSong")
// })

app.all('/songData', (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-54-219-75-95.us-west-1.compute.amazonaws.com:3001/"
  });
});

// app.get('/songData', (req, res) => {
//   res.redirect("http://ec2-18-144-8-70.us-west-1.compute.amazonaws.com:3003/songData")
// })

app.all('/songs', (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-52-53-195-134.us-west-1.compute.amazonaws.com/"
  })
});

// app.get('/sonogs', (req, res) => {
//   res.redirect("http://ec2-18-144-8-70.us-west-1.compute.amazonaws.com:3003/songs")
// })

app.all('/api/comments', (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-144-133-175.us-west-1.compute.amazonaws.com:4001/"
  })
});

app.all('/api/reply', (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-144-133-175.us-west-1.compute.amazonaws.com:4001/"
  })
});

app.all('/api/tracker', (req, res) => {
  proxy.web(req, res, {
    target: "http://ec2-18-144-133-175.us-west-1.compute.amazonaws.com:4001/"
  })
});

app.listen(port, () => console.log(`CAN YOU HEAR ME @ ${port}`));