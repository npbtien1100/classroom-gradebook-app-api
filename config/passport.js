const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  findOneByEmail,
  findOneById,
  createUserByFederatedUser,
} = require("../components/users/user.service");
const {
  createFederatedUser,
  getOneFederatedUser,
} = require("../components/federatedUser/federatedUser.service");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

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
        const user = await findOneById(jwt_payload.id);
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

  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL,
        profileFields: ["id", "displayName", "photos", "email"],
        state: true,
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
        //Find user
        const { provider, id, displayName, photos } = profile;
        const federatedUser = await getOneFederatedUser(provider, id);
        console.log("FederatedUser: ");
        console.log({ federatedUser });
        let user;
        if (!federatedUser) {
          user = await createUserByFederatedUser({
            name: displayName,
            image: photos[0].value,
          });
          await createFederatedUser({
            provider: provider,
            subject: id,
            userId: user.id,
          });
        } else {
          user = await findOneById(federatedUser.userId);
          console.log("Trong passport: ");
          console.log({ user });
        }
        return done(null, user.dataValues);
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
        state: true,
      },
      function (accessToken, refreshToken, profile, done) {
        console.log(profile);
        return done(null, profile);
      }
    )
  );
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
  //       return done(null, profile);
  //     }
  //   )
  // );
};
