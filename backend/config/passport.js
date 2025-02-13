const MagicLinkStrategy = require("passport-magic-link").Strategy;
const User = require("../models/User");
const sgMail = require("@sendgrid/mail");

//set SendGrid API
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (passport) => {
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findById(id);
      done(null, user);
    } catch (err) {
      done(err);
    }
  });

  passport.use(
    new MagicLinkStrategy(
      {
        secret: process.env.MAGIC_LINK_SECRET,
        userFields: ["email"],
        tokenField: "token",
        verifyUserAfterToken: true,
        callbackUrl: `${process.env.BASE_URL}/auth/magiclink/callback`,
        sendMagicLink: async (user, token) => {
          const link = `${process.env.BASE_URL}/auth/magiclink/callback?token=${token}`;

          const msg = {
            to: user.mail,
            from: process.env.SENDGRID_FROM_EMAIL,
            subject: "Your Magic Login Link",
            html: `
              <h2>Login to BP Tracker</h2>
              <p>Click the link below to login:</p>
              <a href="${magicLink}">Login</a>
              <p>If you did not request this, please ignore.</p>
            `,
          };

          try {
            await sgMail.send(msg);
            console.log(`Magic link sent to ${user.email}`);
          } catch (err) {
            console.error(
              "❌ Error sending magic link email:",
              err.response?.body || err
            );
          }
        },
      },
      async (user, done) => {
        try {
          let existingUser = await User.findOne({ email: user.email });
          if (!existingUser) {
            existingUser = await User.create({ email: user.email });
          }
          return done(null, existingUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
