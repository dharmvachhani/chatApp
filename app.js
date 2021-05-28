var createError = require("http-errors");
var express = require("express");
var http = require("http").Server(app);
var io = require("socket.io")(http);
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

require("./db/db");

var indexRouter = require("./routes/index");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//session
app.use(
  session({
    secret: "chat app",
    resave: false,
    saveUninitialized: true,
  })
);

io.on("connection", function (socket) {
  socket.on("chat message", function (msg) {
    io.emit("chat message", msg);
    console.log("My Chat Message is " + msg);
    const mybodydata = {
      chat_details: msg,
    };
    var data = chatmodel(mybodydata);
    data.save(function (err) {
      if (err) {
      } else {
        console.log("Saved");
      }
    });
  });
});

app.use("/", indexRouter);

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

app.listen(3000);
