const FacebookStrategy = require("passport-facebook").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const {
  findOneById,
  findOrCreateAUser,
} = require("../components/users/user.service");
const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

module.exports = (passport) => {
  passport.use(
    new JwtStrategy(opts, async function (jwt_payload, done) {
      console.log(jwt_payload);
      try {
        const user = await findOneById(jwt_payload.id);
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
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
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          console.log("Co chay vao profile!");
          if (!profile._json.email) {
            return done(null, false);
          }
          const [user, created] = await findOrCreateAUser(
            { email: profile._json.email },
            {
              email: profile._json.email,
              name: profile._json.name,
              image: profile._json.picture.data.url,
              registerType: "socialLinked",
            }
          );
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.GOOGLE_CALLBACK_URL,
      },
      async function (accessToken, refreshToken, profile, done) {
        try {
          const [user, created] = await findOrCreateAUser(
            { email: profile._json.email },
            {
              email: profile._json.email,
              name: profile._json.name,
              image: profile._json.picture,
              registerType: "socialLinked",
            }
          );
          return done(null, user);
        } catch (error) {
          return done(error, false);
        }
      }
    )
  );
};

// //Find user
// const { provider, id, displayName, photos } = profile;
// const federatedUser = await getOneFederatedUser(provider, id);
// console.log("FederatedUser: ");
// console.log({ federatedUser });
// let user;
// if (!federatedUser) {
//   user = await createUserByFederatedUser({
//     name: displayName,
//     image: photos[0].value,
//   });
//   await createFederatedUser({
//     provider: provider,
//     subject: id,
//     userId: user.id,
//   });
// } else {
//   user = await findOneById(federatedUser.userId);
//   console.log("Trong passport: ");
//   console.log({ user });
// }
// return done(null, user.dataValues);
