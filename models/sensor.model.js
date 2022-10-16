const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new mongoose.Schema(
  {
    co2: {
      type: Number,
    },
    temp: {
      type: Number,
    },
    humidity: {
      type: Number,
    },
    light: {
      type: Number,
    },
    soilMoisture: {
      type: Number,
    },
    soilNPK: {
      type: Number,
    },
    soilPH: {
      type: Number,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Sensor", schema, "Sensor");
