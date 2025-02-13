const express = require("express");
const passport = require("passport");
const {
  sendMagicLinkResponse,
  loginSuccess,
  loginFailure,
  getDashboard,
} = require("../controllers/auth");
const ensureAuthenticated = require("../middleware/auth");

const router = express.Router();

//trigger magic link email
router.post(
  "/magiclink",
  passport.authenticate("magiclink", { action: "requestToken" }),
  sendMagicLinkResponse
);

// Callback link (user clicks from email)
router.get(
  "/magiclink/callback",
  passport.authenticate("magiclink", {
    failureRedirect: "/auth/fail",
  }),
  loginSuccess
);

// Failure route
router.get("/fail", loginFailure);

// Protected route
router.get("/dashboard", ensureAuthenticated, getDashboard);

module.exports = router;
