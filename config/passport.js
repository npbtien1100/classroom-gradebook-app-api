const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("passport");
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
        console.log({federatedUser});
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
          console.log({user});
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

  passport.serializeUser((user, done) => {
    console.log("Chay vao serialize!");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Chay vao Derialize!");
    console.log("ID user: " + id);
    const query = await findOneById(id);
    console.log(query);
    if (query != null) {
      const user = query.dataValues;
      return done(null, user);
    } else return done(null, null);
  });
};
