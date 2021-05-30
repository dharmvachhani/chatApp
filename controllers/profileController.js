var User = require("../models/usersModel");

module.exports = function (req, res, next) {
  User.find(function (err, result) {
    if (err) throw err;
    const alluser = result;

    User.findOne({ unique_id: req.session.userid }, function (err, data) {
      if (!data) {
        res.redirect("/");
      } else {
        //console.log("found");
        return res.render("data", {
          user: data,
          alluser: alluser,
        });
      }
    });
  });
};
