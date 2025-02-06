const app = require("./app");
const connectDB = require("./config/database");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

// connect to database
connectDB();

//server running
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${PORT}, you better catch it!`);
});
