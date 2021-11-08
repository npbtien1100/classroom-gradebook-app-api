module.exports = {
  checkAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    res.json({ message: "Please login " });
  },
  checkNotAuthenticated: function (req, res, next) {
    if (req.isAuthenticated()) {
      res.json({ message: "You can't access to this" });
    }
    next();
  },
};
