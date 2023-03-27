const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    payload: {
      type: Array,
    },
  },
);

module.exports = mongoose.model("myCollection", schema, "myCollection");
