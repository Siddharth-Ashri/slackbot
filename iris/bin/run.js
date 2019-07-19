"use strict";

const service = require("../server/service");
const http = require("http");
const SlackClient = require("../server/slackClient");
const { bearerToken, clientToken } = require("../config");
const witClient = require("../server/witClient")(bearerToken);
const logLevel = "verbose";
const serviceRegistry = service.get("serviceRegistry");

const rtm = SlackClient.init(clientToken, logLevel, witClient, serviceRegistry);

rtm
  .start()
  .then(() => console.log("Connected to Slack"))
  .catch(err => console.error(`Error: ${err}`));

let server = http.createServer(service);

SlackClient.addHanldeOnAuthenticated(rtm, () => {
  server.listen(3000);
});

server.on("listening", () => {
  console.log(
    `IRIS is listening on port ${
      server.address().port
    } and is running in ${service.get("env")} mode `
  );
});
