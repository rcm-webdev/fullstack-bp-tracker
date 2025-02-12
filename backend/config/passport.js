const { Strategy: JwtStrategy, ExtractJwt } = require("passport-jwt"); // 👈🏽 import jwt strategy
const User = require("../models/User"); // 👈🏽 load user model, gain access so we can verify jwt later
require("dotenv").config(); // 👈🏽 load env variables

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 👈🏽 tell passport to look for token in Auth header using Bearer token scheme
  secretOrKey: process.env.JWT_SECRET, // 👈🏽 our secret key
};

module.exports = (passport) => {
  passport.use(
    // 👈🏽 create and register strategy
    new JwtStrategy(opts, async (jwt_payload, done) => {
      // 👈🏽 callback
      try {
        const user = await User.findById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
};
