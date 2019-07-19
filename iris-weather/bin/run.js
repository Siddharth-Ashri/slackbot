"use strict";
const http = require("http");
const service = require("../server/service");
const request = require("superagent");

let server = http.createServer(service);

server.listen();

server.on("listening", () => {
  console.log(`Server is listening on  ${server.address().port}`);

  let announce = () => {
    request.put(
      `http://localhost:3000/service/weather/${server.address().port}`,
      (err, response) => {
        if (err || !response.body) {
          console.log(err);
          console.log("Had some trouble connecting to Iris");
        }
        console.log(response.body);
      }
    );
  };
  announce();
  setInterval(announce, 15 * 1000);
});
