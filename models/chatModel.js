var mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  from: Number,
  to: Number,
  msg: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
