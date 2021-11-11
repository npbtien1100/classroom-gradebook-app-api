const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google").Strategy;
const UserServices = require("../components/users/user.service");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

// var opts = {};
// opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
// opts.secretOrKey = "secret";
// opts.issuer = "accounts.examplesoft.com";
// opts.audience = "yoursite.net";
const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      //console.log("Start ");
      console.log(jwt_payload);
      try {
        const user = await UserServices.findOneById(jwt_payload.id);
        //console.log("User: " + user);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      } catch (error) {
        console.log(error);
      }
      // UserServices.findOneById(jwt_payload.id, function (err, user) {
      //   console.log("User: " + user);
      //   if (err) {
      //     return done(err, false);
      //   }
      //   if (user) {
      //     return done(null, user);
      //   } else {
      //     return done(null, false);
      //     // or you could create a new account
      //   }
      // });
    })
  );

  // passport.use(
  //   new LocalStrategy(
  //     { usernameField: "email" },
  //     async (email, password, done) => {
  //       //Find user
  //       const query = await UserServices.findOneByEmail(email);
  //       if (query == null) {
  //         console.log("Your email is not registered.");
  //         return done(null, false, {
  //           message: "Your email is not registered.",
  //         });
  //       }
  //       const user = query.dataValues;
  //       if (user.isVerify == false) {
  //         console.log("Please verify your email");
  //         return done(null, false, {
  //           message: "Your email is not verified",
  //         });
  //       }

  //       if (user.isLock == true) {
  //         console.log("Your account has been locked");
  //         return done(null, false, {
  //           message: "Your account has been locked",
  //         });
  //       }

  //       //Macth password
  //       bcrypt.compare(password, user.password, (err, result) => {
  //         if (err) throw err;
  //         if (result) {
  //           return done(null, user);
  //         } else {
  //           console.log("Password is incorrect.");
  //           return done(null, false, { message: "Password incorrect." });
  //         }
  //       });
  //     }
  //   )
  // );

  // passport.use(
  //   new FacebookStrategy(
  //     {
  //       clientID: process.env.FACEBOOK_KEY,
  //       clientSecret: process.env.FACEBOOK_SECRET,
  //       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
  //     },
  //     function (accessToken, refreshToken, profile, done) {
  //       process.nextTick(function () {
  //         //Check whether the User exists or not using profile.id
  //         console.log(profile);
  //         if (config.use_database) {
  //           //Further code of Database.
  //         }
  //         return done(null, profile);
  //       });
  //     }
  //   )
  // );
  // passport.use(
  //   new GoogleStrategy(
  //     {
  //       consumerKey: process.env.GOOGLE_CONSUMER_KEY,
  //       consumerSecret: process.env.GOOGLE_CONSUMER_SECRET,
  //       callbackURL: process.env.GOOGLE_CALLBACK_URL,
  //     },
  //     function (token, tokenSecret, profile, done) {
  //       process.nextTick(function () {
  //         //Check whether the User exists or not using profile.id
  //         console.log(profile);
  //         if (config.use_database) {
  //           //Further code of Database.
  //         }
  //         return done(null, profile);
  //       });
  //       // console.log(profile);
  //       // return done(null, profile);
  //       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //       //   return done(err, user);
  //       // });
  //     }
  //   )
  // );

  // passport.serializeUser((user, done) => {
  //   done(null, user.id);
  // });
  // passport.deserializeUser(async (id, done) => {
  //   console.log("ID user: " + id);
  //   const query = await findOneById(id);
  //   console.log(query);
  //   if (query != null) {
  //     const user = query.dataValues;
  //     return done(null, user);
  //   } else return done(null, null);
  // });
};
