// connect to db
const mongoose = require("mongoose");

//create a schema for user
const userSchema = new mongoose.Schema({
  //take in email
  email: { type: String, required: true, unique: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", userSchema);
