"use strict";
const request = require("superagent");

module.exports.process = (intentData, registry, cb) => {
  //check if there is any errors with the time and the location
  if (intentData.intent[0].value !== "weather") {
    return cb(
      new Error(
        `wrong intent provided expected: Weather got 
        ${intentData.intent[0].value}`
      )
    );
  }
  const location = intentData.location[0].value;
  if (!location) {
    return cb(new Error("No location provided!"));
  }

  // no errors with the time or location continue check error for the service
  const service = registry.get("weather");
  if (!service) {
    return cb(false, `${intentData.intent[0].value} service not available`);
  }

  try {
    request.get(
      `http://${service.ip}:${service.port}/service/weather/${location}`,
      (err, res) => {
        if (err || res.status !== 200 || !res.body.result) {
          console.log(err);
          return cb(false, `I could not find the weather in ${location}`);
        }
        return cb(false,`The weather in ${location} is ${res.body.result.weatherTemp} celsius with ${res.body.result.weatherDescription}  `)
      }
    );
  } catch (err) {}
};
