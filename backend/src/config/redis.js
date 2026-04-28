const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
});

// Error handling
redisClient.on("error", (err) => {
  console.error("Redis Error:", err);
});

// Safe connect
const connectRedis = async () => {
  try {
    if (process.env.REDIS_URL) {
      await redisClient.connect();
      console.log("✅ Redis Connected");
    } else {
      console.log("⚠️ Redis URL not provided");
    }
  } catch (err) {
    console.error("❌ Redis connection failed:", err.message);
  }
};

module.exports = { redisClient, connectRedis };
