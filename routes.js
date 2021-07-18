const express = require("express");
const routes = express.Router();
var nodemailer = require("nodemailer");
const { google } = require("googleapis");
const mailTemplate = require("./mail-template");

const CLIENT_ID =" ";
const CLIENT_SECRET = " ";
const REDIRECT_URI = "https://developers.google.com/oauthplayground";
const REFRESH_TOKEN =" ";

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

routes.get("/sendmail", async (req, res) => {
  try {
    const accessToken = await oAuth2Client.getAccessToken();
    var sender = nodemailer.createTransport({
      service: "gmail",
      auth: {
        type: "OAuth2",
        user: "testmailproject20@gmail.com",
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });

    var composeEmail = {
      from: "test 😉 <samplemail.com>",
      to: "receivermailid",
      subject: "checking mail verification",
      html: mailTemplate,
    };

    sender.sendMail(composeEmail, function (err, res) {
      if (err) {
        console.log(err);
      } else {
        console.log("sending correctly", res);
      }
    });
  } catch (err) {
    res.send(err);
  }
});

module.exports = routes;
