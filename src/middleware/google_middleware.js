const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const Creds = require("../models/creds");
const { error } = require("console");
dotenv.config();



const setCreds = async (req, res, next) => {
  try {

    if(!req.user.client_id || !req.user.client_secret || req.user.redirect_uri){
      return res.send("Missing Oauth client params")
    }

    const oauth2Client = new google.auth.OAuth2(
      req.user.client_id, /////LATER HAVE TO CHANGE THIS SO THAT IT COMES FROM DATABASE FOR SPECIFIC USER
      req.user.client_secret, //
      req.user.redirect_uri //
    );
    
    //Set Refresh Token
    oauth2Client.on("tokens", (tokens) => {
      if (tokens.refresh_token) {
        // store the refresh_token in my database!
        console.log(tokens.refresh_token);
        Creds.updateOne(
          { user_id: req.user._id },
          { $set: { refresh_token: tokens.refresh_token } }
        );
      }
      //if no refresh token in tokens then update other values
      Creds.updateOne(
        { user_id: req.user._id },
        {
          $set: {
            access_token: tokens.access_token,
            scope: tokens.scope,
            token_type: tokens.token_type,
            expiry_date: tokens.expiry_date,
          },
        }
      )
        .then(() => {
          console.log("updated");
        })
        .catch((error) => {
          console.log(error);
        });
    });


//////////////////////////////////////////////////////////////////////

    req.oauth2Client = oauth2Client;
    // const creds = fs.readFileSync("creds.json");
    const creds1 = await Creds.find({ user_id: req.user._id });
    oauth2Client.setCredentials(creds1[0]);
    next();
  } catch (error) {
    console.log("No credentials found ", error);
  }
};

module.exports = setCreds;
