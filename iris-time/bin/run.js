"use strict";

const service = require("../server/service");
const superagent = require("superagent");
const http = require("http");

const server = http.createServer(service);
//listen on a random port
server.listen();

server.on("listening", () => {
  console.log(`IRIS-time is listening on PORT ${server.address().port}`);

  //make a put request with superagent and subscribe this to the main app
  let announce = () => {
    superagent.put(
      `http://localhost:3000/service/time/${server.address().port}`,
      (err, res) => {
        if (err) {
          console.log(err);
          console.log("Had some trouble connecting to Iris");
        }
        console.log(res.body);
      }
    );
  };
  announce();
  setInterval(announce, 15* 1000);
});
