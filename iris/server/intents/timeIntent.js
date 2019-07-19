"use strict";

const request = require("superagent");

module.exports.process = (intentData, serviceRegistry, cb) => {
  //intent Checking

  if (intentData.intent[0].value !== "time") {
    return cb(
      new Error(
        `Wrong intent provided expected: time got ${intentData.intent[0].value}`
      )
    );
  }

  if (!intentData.location) {
    return cb(new Error("No location provided"));
  }
  let service = serviceRegistry.get("time");
  if (!service) {
    return cb(null, "No service available");
  }
  const location = intentData.location[0].value;
  request.get(
    `http://${service.ip}:${service.port}/service/time/${location}`,
    (err, res) => {
      if (err || res.status != 200 || !res.body.result) {
        console.log(err);
      }
      return cb(null,`The time in ${location} is ${res.body.result} `)
    }
  );
};
