var mongoose = require("mongoose");

const chatSchema = new mongoose.Schema({
  unique_id: Number,
  from: Number,
  to: Number,
  msg: String,
});

const Chat = mongoose.model("Chat", chatSchema);

module.exports = Chat;
