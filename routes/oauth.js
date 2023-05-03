const router = require('express').Router();
const { google } = require('googleapis');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  'https://api.raccoondiploma.nomoredomains.sbs/oauth/google/redirect',
);

const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

router.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.send({ message: url });
});

module.exports = router;
