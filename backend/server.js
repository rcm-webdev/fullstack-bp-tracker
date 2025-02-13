// backend/server.js
require("dotenv").config(); // Load env vars early

const app = require("./app");
const connectDB = require("./config/database");

const PORT = process.env.PORT || 5000;

// Connect to database and then start server
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(
        `🚀 Server is running on http://localhost:${PORT}, you better catch it!`
      );
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1); // Exit process with failure
  });
