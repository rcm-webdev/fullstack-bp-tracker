const sendMagicLinkResponse = (req, res) => {
  res.json({ message: "Check your email for a magic link." });
};

const loginSuccess = (req, res) => {
  res.redirect("http://localhost:5173/dashboard"); // Or show session info
};

const loginFailure = (req, res) => {
  res.status(401).json({ message: "Authentication failed." });
};

const getDashboard = (req, res) => {
  if (!req.isAuthenticated()) {
    return res.status(401).json({ message: "Not logged in" });
  }
  res.json({ message: `Welcome, ${req.user.email}` });
};

module.exports = {
  sendMagicLinkResponse,
  loginSuccess,
  loginFailure,
  getDashboard,
};
