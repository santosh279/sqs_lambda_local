"use strict";

const AWS = require("aws-sdk");
const sqs = new AWS.SQS();

module.exports.producer = () => {

  let params = {
    MessageBody: "message from SQS provider",
    QueueUrl: process.env.USER_MESSAGE_QUEUE_URL,
  };

  sqs.sendMessage(params, function (err, data) {
    if (err) {
      console.log("Error encountered sending a message: %s", err);
    } else {
      console.log("A message about a cat fact is sent to " + params.QueueUrl);
    }
  });
};

module.exports.consumer = function(event, context, callback) {

    console.log("User response: " + event.Records[0].body);

    const response = {
        statusCode: 200,
        body: JSON.stringify({
            message: event.Records[0].body
        }),
    };

    callback(null, response);
};

