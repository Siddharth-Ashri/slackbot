"use strict";

let url = require("url");
let request = require("https");
function handleWitclient(res) {
  return res.entities;
}
module.exports = token => {
  let options = {
    headers: {
      Authorization: "Bearer " + token
    }
  };
  let ask = (message, cb) => {
    request.get(
      `https://api.wit.ai/message?v=20190510&q=${message}`,
      options,
      res => {
        res.on("error", err => {
          console.log(err);
          cb(err);
        });
        if (res.statusCode != 200) {
          return cb(`Expecting status code 200 but received ${res.statusCode}`);
        }
        let data = new Object();
        res.setEncoding("utf8");
        res
          .on("data", chunk => {
            data += chunk;
          })
          .on("end", () => {
            data = data.replace("[object Object]", "");
            data = JSON.parse(data);
            let handler = handleWitclient(data);
            return cb(null, handler);
          });
      }
    );
  };
  return {
    ask
  };
};
