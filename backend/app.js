const express = require("express");
const passport = require("passport");
require("./config/passport")(passport); // 👈🏽 load passport config

const app = express();

app.use(express.json());
app.use(passport.initialize());

module.exports = app;
