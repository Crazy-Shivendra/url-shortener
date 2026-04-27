const { redisClient } = require("../config/redis");

const WINDOW_SIZE = 60; // seconds
const MAX_REQUESTS = 10; // per window

const redisRateLimiter = async (req, res, next) => {
  try {
    const ip = req.ip;

    const key = `rate:${ip}`;

    const requests = await redisClient.get(key);

    if (requests && parseInt(requests) >= MAX_REQUESTS) {
      return res.status(429).json({
        message: "Too many requests (Redis limiter)",
      });
    }

    if (requests) {
      await redisClient.incr(key);
    } else {
      await redisClient.set(key, 1, {
        EX: WINDOW_SIZE,
      });
    }

    next();
  } catch (err) {
    console.error("Redis rate limiter error:", err);
    next(); // fail open (important)
  }
};

module.exports = redisRateLimiter;
