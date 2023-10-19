const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
const cors = require("cors");

//require("dotenv").config();

const PORT = 80;
const HOST = "games-updates-monitor-backend.onrender.com";

const API_URL = "https://store.steampowered.com";
const API_URL2 = "https://api.steampowered.com";

app.use(cors());

app.get("/products/:id", function (req, res, next) {
  res.json({ msg: "This is CORS-enabled for all origins!" });
});

app.listen(PORT, function () {
  console.log("CORS-enabled web server listening on port");
});

app.get("/status", (req, res, next) => {
  res.send("This is a proxy service");
});

const proxyOptions = {
  target: API_URL,
  changeOrigin: true,
};

const proxyOptions2 = {
  target: API_URL2,
  changeOrigin: true,
};

const proxy = createProxyMiddleware(proxyOptions);
const proxy2 = createProxyMiddleware(proxyOptions2);

app.use("/api", proxy);
app.use("/ISteamNews", proxy2);
app.use("/ISteamApps", proxy2);

app.listen(HOST, () => {
  console.log(`Proxy Started at ${HOST}`);
});
