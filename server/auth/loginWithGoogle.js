const passport = require("passport");
const User = require("../models/User");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const Google_CALLBACK_URL = "http://localhost:5000/api/v1/auth/google/callback";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: Google_CALLBACK_URL,
      passReqToCallback: true,
    },
    async (req, accessToken, refreshToken, profile, done) => {
      console.log("🚀 ~ file: loginWithGoogle.js:16 ~ profile:", profile);
      /// call data base to check if user exists or not
      const defaultUser = {
        fullName: `${profile.name.givenName} ${profile.name.familyName}`,
        email: profile.emails[0].value,
        googleId: profile.id,
        picture: profile.photos[0].value,
      };
      try {
        const user = await User.findOrCreate({
          where: { googleId: defaultUser.googleId },
          defaults: defaultUser,
        });
        if (!user) {
          return done(new Error("something went wrong"), null);
        }

        return done(null, user[0]);
      } catch (err) {
        return done(err, null);
      }
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findByPk(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
