const express = require("express");
const app = express();
const colors = require("colors");
const mongoose = require("mongoose");
const { SensorModel, UserModel } = require("./models");
const { Response } = require("./classes");
const bodyParser = require("body-parser");
require("dotenv").config();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());

app.get("/login", async (req, res) => {
  try {
    if (!req.query.username || !req.query.password) {
      return res.json(new Response(400, "missing query parameters", null));
    }
    const user = await UserModel.findOne({
      username: req.query.username,
      password: req.query.password,
    });
    if (!user) {
      return res.json(new Response(404, "no record found", false));
    }
    return res.json(new Response(200, "success", true));
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

app.get("/sensor", async (req, res) => {
  try {
    const rows = await SensorModel.find();
    return res.json(new Response(200, "success", rows));
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

app.get("/graph-data/:field", async (req, res) => {
  try {
    let option = {};
    option[req.params.field] = 1;
    option["updatedAt"] = 1;

    const rows = await SensorModel.find({}, option);

    return res.json(new Response(200, "success", rows));
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

app.post("/sensor", async (req, res) => {
  try {
    const sensor = new SensorModel(req.body);
    await sensor.save();

    return res.json(new Response(200, "success", sensor));
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

app.put("/sensor", async (req, res) => {
  try {
    const update = await SensorModel.findOneAndUpdate(
      {
        _id: req.body.id,
      },
      req.body
    );

    if (!update) {
      return res.json(new Response(404, "no record found", null));
    }
    return res.json(new Response(200, "success", null));
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

module.exports = app;
