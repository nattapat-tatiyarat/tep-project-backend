const express = require("express");
const app = express();
const colors = require("colors");
const cors = require("cors");
const bodyParser = require("body-parser");
const { SensorModel, UserModel } = require("./models");
const { Response } = require("./classes");
require("dotenv").config();

app.use(cors());

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(express.json());

//

app.get("/graph-data/:field", async (req, res) => {
  try {
    let sort = { created_at: 1 };
    let option = {};
    option[req.params.field] = 1;
    option["createdAt"] = 1;

    const rows = await SensorModel.find({}, option).sort(sort);

    return res.json(new Response(200, "success", rows));
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

app.get("/sensor", async (req, res) => {
  try {
    const rows = await SensorModel.find();
    const number = await SensorModel.countDocuments();
    return res.json(
      new Response(200, "success", {
        total_documents: number,
        data: rows,
      })
    );
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

app.get("/sensor-pagination", async (req, res) => {
  try {
    const page = req.query.page;
    const limit = req.query.limit;
    const skip = page * limit - limit;
    const rows = await SensorModel.find(
      {},
      {},
      {
        skip: skip,
        limit: limit
      }
    );
   
    const number = await SensorModel.countDocuments();
    return res.json(
      new Response(200, "success", {
        total_documents: number,
        data: rows,
      })
    );
  } catch (err) {
    return res.json(new Response(500, err.message, null));
  }
});

module.exports = app;
