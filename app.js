var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var session = require("express-session");

const Chat = require("./models/chatModel");

const app = express();

var http = require("http");
var server = http.createServer(app);

const { Server } = require("socket.io");
const io = new Server(server);

require("./db/db");

var indexRouter = require("./routes/index");

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

app.use("/", indexRouter);

io.on("connection", (socket) => {
  console.log("socket connected");

  Chat.find().then((result) => {
    io.emit("store-messages", result);
  });

  socket.on("send_message", function (data) {
    const message = new Chat({
      from: data.from,
      to: data.to,
      msg: data.message,
    });
    message.save().then(() => {
      Chat.find().then((result) => {
        io.emit("store-messages", result);
      });
      io.emit("new_message", data);
    });
  });
});

server.listen(3000);
