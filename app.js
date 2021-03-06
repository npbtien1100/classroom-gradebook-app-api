require("dotenv").config();
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const indexRouter = require("./routes/index");
const classesRouter = require("./components/classes/classRouter");
const usersRouter = require("./components/users/user.router");
const authRouter = require("./components/auth/auth.router");
const fileRouter = require("./components/files/fileRouter");
const gradeReviewRouter = require("./components/modelAssociation/gradeReviews/gradeReviewsRouter");
const studentsGradesRouter = require("./components/modelAssociation/studentsGrades/studentsGradesRouter");
const AdminRouter = require("./components/admins/admin.router");
const NotificationRouter = require("./components/modelAssociation/notifications/notificationsRouter");
const passport = require("passport");
const db = require("./config/db.config");
const configPassport = require("./config/passport");
configPassport(passport);
const app = express();

require("./components/modelAssociation/createAllAssociations");

db.sync().then(console.log("Syncing Database Done!"));
// console.log(process.env);
// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(passport.initialize());

//set up cors
const whitelist = [
  "http://localhost:3000",
  process.env.URL_FRONT_END,
  process.env.URL_WEB,
  process.env.URL_WEB_ADMIN,
];
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
app.use(cors(corsOptions));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/classes", classesRouter);
app.use("/api/users", usersRouter);
app.use("/api/auth", authRouter);
app.use("/api/files", fileRouter);
app.use("/api/students-grades", studentsGradesRouter);
app.use("/api/grade-review", gradeReviewRouter);

app.use("/api/admin/", AdminRouter);
app.use("/api/notifications", NotificationRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
