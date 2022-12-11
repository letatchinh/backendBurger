const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
const webpush = require("web-push");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const FCM = require("fcm-node");

app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "client")));
// eslint-disable-next-line max-len
const publicVapidKey ="BL-ioOuW3h-I5G4u4g1OHH__s8xqBg-3wIQzwnD9JLN4INWxk_OhCw1d_YdN1jCgj4dBmqqXgdz2oK_FR6utl7c";
const privateVapidKey = "6KnL8zGQs0XpLurHK15QUHBZbagT57IAgoGpfJ1_Ckg";
webpush.setVapidDetails(
    "mailto:mercymeave@section.com",
    publicVapidKey,
    privateVapidKey
);

app.use(cors());

app.use(require("./routes/userRoute"));
app.post("/subscribe", (req, res) => {
  const {subscription, title, description, icon} = req.body;
  console.log(req.body);

  res.status(201).json({});
  const payload = JSON.stringify({title, description, icon});

  webpush.sendNotification(subscription, payload)
      .catch((err) => console.error(err));
});
const serverKey = process.env.SERVER_KEY_FIREBASE;

app.post("/sendFirebase", (req, res) => {
  const fcm = new FCM(serverKey);
  const message = {
    operation: "create",
    notification_key_name: "appUser-Chris",
    // eslint-disable-next-line max-len
    registration_ids: ["d0fcy-3ItPHPaytvvRgtuw:APA91bFlzOY_q6nsDDyPabknxKtAdfA4VBB9uUsZn7g--4e2pXkoNYPsE-pg9rxO6svP4qOl6-ywDoor9VC-ZIhROlWGijDM3Lkids4Qb--7wl25m7GOnFB2ZxQtw2uUIUiID-ZhaK8n", "cmNK21ySFTUuEhncfjAa4Z:APA91bHf2H_rxPkebPARpFBOCepYaUY4t_PUmgjwomHNziiq2YKbQ-C5EJoZl9I_7Sd8Z8V0Sjpb3TgNxosuOMmCy-AOQGkP0Mxac7dnog4xSGqAMnz3SSLBaVnhuwD20O5MGg1IHpZW"],
    notification: {
      title: "Title of your push notification",
      body: "Body of your push notification",
    },

    data: {
      my_key: "my value",
      my_another_key: "my another value",
    },
  };
  fcm.send(message, function(err, response) {
    if (err) {
      console.log("Something has gone wrong!");
    } else {
      console.log("Successfully sent with response: ", response);
    }
  });
  res.status(201).json({mess: "OKLA"});
});


// Send a message to the device corresponding to the provided
// registration token.

exports.app = functions.https.onRequest(app);
