//This service is used to get the weather from OpenWeatherMaps API
"use strict";
const express = require("express");
const service = express();
const request = require("superagent");
const { KEY } = require("../conifg");

service.get("/service/weather/:location", (req, res, next) => {
  let count = 1;
  let unit = "metric";
  request.get(
    "api.openweathermap.org/data/2.5/weather/?q=" +
      req.params.location +
      "&units=" +
      unit +
      "&APPID=" +
      KEY,
    (err, response) => {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        throw err;
      }
      console.log(response);
      const result = response.body;
      let weatherTemp = result.main.temp;
      let weatherDescription = result.weather[0].description;
      console.log(weatherDescription);
      let time = result.dt_txt;
      res.json({ result: { weatherTemp, weatherDescription } });
    }
  );
});
module.exports = service;
