const app = require("./src/app");

const connectDB = require("./src/config/db");

// Connect to MongoDB
const { connectRedis } = require("./src/config/redis");
console.log("REDIS_URL =", process.env.REDIS_URL);

const startServer = async () => {
  await connectDB();
  await connectRedis();

  app.listen(3000, () => {
    console.log("Server running on port 3000");
  });
};

startServer();
