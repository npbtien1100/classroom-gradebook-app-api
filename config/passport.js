const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const { use } = require("passport");
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
