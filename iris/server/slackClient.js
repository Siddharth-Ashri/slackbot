"use strict";

const RTMClient = require("@slack/rtm-api").RTMClient;
let rtm = null;
let nlp = null;
let registry = null;
//Reacting to Slack events

function handleOnAuthenticated(rtmStartData) {
  console.log(`I am the ${rtmStartData.self.name} bot and part of the team
   ${rtmStartData.team.name} but not yet part of channel`);
}

//rtm object and handler is the callback function
function addHanldeOnAuthenticated(rtm, handler) {
  rtm.on("authenticated", handler);
}
function handleIncomingMessages(message) {
  //should only ask if the user explicitly asks Iris
  if (message.text.toLowerCase().includes("iris")) {
    nlp.ask(message.text, (err, res) => {
      try {
        console.log(res.intent);
        if (!res.intent || !res.intent[0] || !res.intent[0].value) {
          throw new Error("Could not extract intent");
        }
        const intent = require(`./intents/${res.intent[0].value}Intent`);
        intent.process(res, registry ,(error, response) => {
          if (error) {
            console.log(error);
            return;
          }
          rtm.sendMessage(response, message.channel);
        });
      } catch (err) {
        console.log(err);
        console.log(res);
        rtm.sendMessage(
          "Sorry, I do not know what you are talking about",
          message.channel
        );
      }
      if (err) {
        console.log(err);
        return;
      } else if (!res.intent) {
        rtm.sendMessage("Sorry, I do not know what you mean", message.channel);
      }
    });
  }
}

module.exports.init = function SlackClient(token, logLevel, nlpClient,serviceRegistry) {
  rtm = new RTMClient(token, { logLevel });
  nlp = nlpClient;
  registry = serviceRegistry;
  addHanldeOnAuthenticated(rtm, handleOnAuthenticated);
  rtm.on("message", handleIncomingMessages);
  return rtm;
};
module.exports.addHanldeOnAuthenticated = addHanldeOnAuthenticated;
