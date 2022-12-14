const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema({
  username: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  thumbnail: {
    type: String,
  },
});

module.exports = mongoose.model("User", schema, "User");
