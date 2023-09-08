const fs = require("fs");
const path = require("path");
const { google } = require("googleapis");
const dotenv = require("dotenv");
const Creds = require('../../models/creds')
dotenv.config();



const get_auth_url = async (req, res) => {
  try {
    console.log(req.oauth2Client)
    const oauth2Client = req.oauth2Client
    const url = oauth2Client.generateAuthUrl({
        access_type:"offline",
        scope:[
            "https://www.googleapis.com/auth/drive.appdata",
            'https://www.googleapis.com/auth/drive'
        ]
    })
    res.redirect(url)
  } catch (error) {
    console.log(error)
  }
};


const auth_redirect = async(req,res)=>{
    try {
        const {code} = req.query
        const oauth2Client = req.oauth2Client
        const {tokens} = await oauth2Client.getToken(code)
        //oAuth tokens are auto refreshed by this library
        oauth2Client.setCredentials(tokens)
        Creds.create({
          access_token:tokens.access_token,
          refresh_token: tokens.refresh_token,
          token_type:tokens.token_type,
          scope:tokens.scope,
          expiry_date:tokens.expiry_date
        })
        // fs.writeFileSync("creds.json",JSON.stringify(tokens))
        res.send("success")
    } catch (error) {
        console.log("error")
    }
}

const google_drive_upload = async (req, res) => {
  try {
    const oauth2Client = req.oauth2Client
    const drive = google.drive({
      version: "v3",
      auth: oauth2Client,
    });

    const result = await drive.files.create({
      requestBody: {
        name: "Test",
        mimeType: "text/plain",
      },
      media: {
        mimeType: "text/plain",
        body: "Hello World 11",
      },
    });

   res.send(result);
  } catch (error) {
    console.log(error)
  }
};

module.exports = {
  google_drive_upload,
  get_auth_url,
  auth_redirect
};
