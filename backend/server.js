const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const cors = require("cors");

require("dotenv").config();

const PORT = 8000;
const HOST = "localhost";

const API_URL = "https://api.igdb.com/";

app.use(cors());

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port" + PORT);
});

app.get("/status", (req, res, next) => {
  res.send("This is a proxy service");
});

const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
  headers: {
    Accept: "application/json",
    "Client-ID": process.env.CLIENT_ID,
    Authorization: process.env.AUTH,
  },
};

const proxy = createProxyMiddleware(proxyOptions);

app.use("/v4", proxy);

app.listen(PORT, HOST, () => {
  console.log(`Proxy Started at ${HOST}:${PORT}`);
});
