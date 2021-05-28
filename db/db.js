var mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/chatapp", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("Connection Established");
  })
  .catch((error) => {
    console.log(`connection error ---- ${error}`);
  });
