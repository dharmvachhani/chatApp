var app = require("app");
var io = require("socket.io").listen(app);

io.on("connection", (socket) => {
  Msg.find().then((result) => {
    socket.emit("output-messages", result);
  });
  console.log("a user connected");
  socket.emit("message", "Hello world");
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("chatmessage", (msg) => {
    const message = new Msg({ msg });
    message.save().then(() => {
      io.emit("message", msg);
    });
  });
});
