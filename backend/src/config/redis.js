const { createClient } = require("redis");

const redisClient = createClient({
  url: process.env.REDIS_URL,
  socket: {
    reconnectStrategy: (retries) => {
      if (retries > 3) {
        console.log("❌ Redis retry limit reached");
        return new Error("Retry limit reached");
      }
      return 1000; // retry after 1s
    },
  },
});

// Error handling
redisClient.on("error", (err) => {
  console.error("❌ Redis Error:", err.message);
});

const connectRedis = async () => {
  try {
    if (!process.env.REDIS_URL) {
      console.log("⚠️ Redis URL not provided");
      return;
    }

    console.log("Connecting to Redis...");
    await redisClient.connect();

    // 🔥 Important: verify connection
    const pong = await redisClient.ping();
    console.log("✅ Redis Connected:", pong);
  } catch (err) {
    console.error("❌ Redis connection failed:", err.message);
  }
};

module.exports = { redisClient, connectRedis };
