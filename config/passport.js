const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("passport");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google").Strategy;
const fbconfig = require("./fb.config");
const {
  findOneByEmail,
  findOneById,
} = require("../components/users/user.service");

module.exports = (passport) => {
  passport.use(
    new LocalStrategy(
      { usernameField: "email" },
      async (email, password, done) => {
        //Find user
        const query = await findOneByEmail(email);
        if (query == null) {
          console.log("Your email is not registered.");
          return done(null, false, {
            message: "Your email is not registered.",
          });
        }
        const user = query.dataValues;
        if (user.isVerify == false) {
          console.log("Please verify your email");
          return done(null, false, {
            message: "Your email is not verified",
          });
        }

        //Macth password
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) throw err;
          if (result) {
            return done(null, user);
          } else {
            console.log("Password is incorrect.");
            return done(null, false, { message: "Password incorrect." });
          }
        });
      }
    )
  );

  passport.use(
    new FacebookStrategy(
      {
        clientID: fbconfig.facebook_key,
        clientSecret: fbconfig.facebook_secret,
        callbackURL: fbconfig.callback_url,
      },
      function (accessToken, refreshToken, profile, done) {
        process.nextTick(function () {
          //Check whether the User exists or not using profile.id
          console.log(profile);
          if (config.use_database) {
            //Further code of Database.
          }
          return done(null, profile);
        });
      }
    )
  );
  //   passport.use(new GoogleStrategy({
  //     consumerKey: GOOGLE_CONSUMER_KEY,
  //     consumerSecret: GOOGLE_CONSUMER_SECRET,
  //     callbackURL: "http://www.example.com/auth/google/callback"
  //   },
  //   function(token, tokenSecret, profile, done) {
  //       User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //         return done(err, user);
  //       });
  //   }
  // ));

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });
  passport.deserializeUser(async (id, done) => {
    console.log("ID user: " + id);
    const query = await findOneById(id);
    console.log(query);
    if (query != null) {
      const user = query.dataValues;
      return done(null, user);
    } else return done(null, null);
  });
};
