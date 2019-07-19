"use strict";
const express = require("express");
let service = express();
// let request = require("https");
let request = require("superagent");
let moment = require("moment");
const { KEY } = require("../config");

// =====WITH HTTP MODULE=====

// function makeRequest(req, res, next) {
//   request.get(
//     "https://maps.googleapis.com/maps/api/geocode/json?address=" +
//       req.params.location +
//       "&key="+KEY,
//     response => {
//       try {
//         if (!response) {
//           throw new Error("Could not get response from API");
//         }
//         res.locals.response = response;
//         next();
//       } catch (err) {
//         res.send({ error: err.message });
//       }
//     }
//   );
// }

// function handleResponse(req, res) {
//   let data = "";
//   let response = res.locals.response;
//   response.setEncoding("utf8");
//   response
//     .on("data", chunk => {
//       data += chunk;
//     })
//     .on("end", () => {
//       data= JSON.parse(data);
//       res.send({ location: data.results[0].geometry.location  });
//     });
// }

service.get("/service/time/:location", (req, res) => {
  request.get(
    "https://maps.googleapis.com/maps/api/geocode/json?address=" +
      req.params.location +
      "&key=" +
      KEY,
    (error, response) => {
      if (error) {
        res.sendStatus(500);
        throw error;
      }
      let location = response.body.results[0].geometry.location;
      let timestamp = +moment().format("X");
      request.get(
        "https://maps.googleapis.com/maps/api/timezone/json?location=" +
          location.lat +
          "," +
          location.lng +
          "&timestamp=" +
          timestamp +
          "&key=" +
          KEY,
        (err, response) => {
          if (err) {
            res.sendStatus(500);
            throw err;
          }
          const result = response.body;
          const timeString = moment
            .unix(timestamp + result.dstOffset + result.rawOffset)
            .utc()
            .format("dddd,MMMM Do YYYY , h:mm:ss a");

          res.json({ result: timeString });
        }
      );
    }
  );
});

module.exports = service;
