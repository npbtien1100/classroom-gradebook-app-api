const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const FacebookStrategy = require("passport-facebook").Strategy;
// const GoogleStrategy = require("passport-google").Strategy;
const UserServices = require("../components/users/user.service");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const GoogleStrategy = require("passport-google-oauth20").Strategy;
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
    })
  );

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
  //       clientID: process.env.GOOGLE_CONSUMER_KEY,
  //       clientSecret: process.env.GOOGLE_CONSUMER_SECRET,
  //       callbackURL: "http://localhost:5000/api/auth/google/callback",
  //     },
  //     async function (token, tokenSecret, profile, done) {
  //       process.nextTick(async function () {
  //         //Check whether the User exists or not using profile.id

  //         //if (config.use_database) {
  //         //Further code of Database.
  //         //If user not in db then -->  create one
  //         //return done(null, profile);
  //         //}
  //         try {
  //           // console.log(profile);
  //           const user = await UserServices.findOneByEmail(profile._json.email);
  //           //console.log(user);
  //           if (user) {
  //             return done(null, profile);
  //           } else {
  //             UserServices.googleCreateUser({
  //               email: profile._json.email,
  //               name: profile._json.name,
  //               image: profile._json.picture,
  //             });
  //           }
  //         } catch (error) {}
  //       });

  //       // console.log(profile);
  //       // return done(null, profile);
  //       // User.findOrCreate({ googleId: profile.id }, function (err, user) {
  //       //   return done(err, user);
  //       // });

  //       return done(null, profile);
  //     }
  //   )
  // );
  // passport.serializeUser(async (user, done) => {
  //   console.log("Serialize User");
  //   //console.log(user);
  //   try {
  //     const query = await UserServices.findOneByEmail(user._json.email);
  //     console.log(query);
  //     user.id = query.id;
  //     done(null, user.id);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // });
  // passport.deserializeUser(async (id, done) => {
  //   console.log("ID user: " + id);
  //   const query = await UserServices.findOneById(id);
  //   console.log(query);
  //   if (query != null) {
  //     const user = query.dataValues;
  //     return done(null, user);
  //   } else return done(null, null);
  // });
};
