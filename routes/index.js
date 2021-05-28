var express = require("express");
var router = express.Router();

var registerController = require("../controllers/registerController");
var loginController = require("../controllers/loginController");
var forgotController = require("../controllers/forgotController");
var logoutController = require("../controllers/logoutController");
var profileController = require("../controllers/profileController");

/* GET home page. */
router.get("/", (req, res, next) => {
  res.render("register");
});
router.post("/", registerController);

router.get("/login", (req, res) => {
  res.render("login");
});

router.post("/login", loginController);

router.get("/forgot", (req, res) => {
  res.render("forget");
});

router.post("/forgot", forgotController);

router.get("/profile", profileController);

router.get("/logout", logoutController);

module.exports = router;
