var User = require("../models/usersModel");

module.exports = function (req, res, next) {
  console.log("profile");
  User.find(function (err, result) {
    if (err) throw err;
    const alluser = result;
    console.log(alluser);

    User.findOne({ unique_id: req.session.userid }, function (err, data) {
      console.log("data");
      console.log(data);
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
