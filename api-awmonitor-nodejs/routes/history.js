var express = require("express");
var router = express.Router();
const History = require("../models/History");
const Validator = require("fastest-validator");
const v = new Validator();

// membaca semua data
router.get("/all", async (req, res) => {
  try {
    const getAllHistory = await History.findAll({});
    res.status(200).json({
      message: "Success",
      data: getAllHistory,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// menulis data
router.post("/input", async (req, res) => {
  try {
    const { location, date, aqi, o3, so2, no2, co, pm10, pm25, temperature, humidity, wind_speed } = req.body;

    // validation
    const schema = {
      location: { type: "string", nullable: false },
      date: { type: "custom", nullable: false },
      aqi: { type: "custom", nullable: false },
      o3: { type: "custom", nullable: false },
      so2: { type: "custom", nullable: false },
      no2: { type: "custom", nullable: false },
      co: { type: "custom", nullable: false },
      pm10: { type: "custom", nullable: false },
      pm25: { type: "custom", nullable: false },
      temperature: { type: "custom", nullable: false },
      humidity: { type: "custom", nullable: false },
      wind_speed: { type: "custom", nullable: false },
    };
    const validate = v.validate(req.body, schema);
    if (validate.length) {
      return res.status(400).json(validate);
    }

    // create
    const newHistory = new History({
      location,
      date,
      aqi,
      o3,
      so2,
      no2,
      co,
      pm10,
      pm25,
      temperature,
      humidity,
      wind_speed,
    });

    await newHistory.save();
    res.status(200).json({
      message: "Input Success",
      data: newHistory,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send(err.message);
  }
});

// membaca nama kota
router.get("/kota", async (req, res) => {
  try {
    const getAllKota = await History.findAll({
      attributes: ["location"],
    });
    res.status(200).json({
      message: "Success",
      data: getAllKota,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// membaca data kota
router.get("/kota/:namaKota", async (req, res) => {
  try {
    const namaKota = req.params.namaKota;
    const getKota = await History.findOne({
      where: { location: namaKota },
    });
    res.status(200).json({
      message: "Success",
      data: getKota,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// edit data
router.put("/edit/:id", async (req, res) => {
  try {
    const { location, date, aqi, o3, so2, no2, co, pm10, pm25, temperature, humidity, wind_speed } = req.body;
    const id = req.params.id;
    const updateHistory = await History.update(
      {
        location,
        date,
        aqi,
        o3,
        so2,
        no2,
        co,
        pm10,
        pm25,
        temperature,
        humidity,
        wind_speed,
      },
      {
        where: { id: id },
      }
    );
    await updateHistory;
    res.status(200).json({
      status: "Edit success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

// delete data
router.delete("/delete/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deleteHistory = await History.destroy({
      where: { id: id },
    });
    await deleteHistory;
    res.status(200).json({
      status: "Delete success",
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("server error");
  }
});

module.exports = router;
