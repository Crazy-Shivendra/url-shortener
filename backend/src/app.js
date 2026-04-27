require("dotenv").config();
const express = require("express");
const redisRateLimiter = require("./middleware/redisRateLimit.middleware");
const cors = require("cors");


const app = express();
app.use(cors());

// ✅ pehle body parse
app.use(express.json());

// ✅ phir rate limiter
app.use(redisRateLimiter);

const urlRoutes = require("./routes/url.routes");

// ✅ routes last me
app.use("/", urlRoutes);

module.exports = app;
