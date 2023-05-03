const { google } = require('googleapis');
// const axios = require('axios');
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

google.options({ auth: oauth2Client });

const getAuthUrl = (req, res, next) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    include_granted_scopes: true,
  });
  res.redirect(url);
  next();
};

/* const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.status);
}; */

/* async function getGoogle(tokens) {
  const res = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + tokens.access_token, 'Content-Type': 'application/json'
    },
  });
  return checkResponse(res);
} */

const getAuthData = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  // const userCredentials = tokens;

  const people = google.people('v1');
  // retrieve user profile
  const user = await people.people.get({
    resourceName: 'people/me',
    personFields: 'emailAddresses',
  });

  res.send({ message: user.data });
};

module.exports = {
  getAuthUrl,
  getAuthData,
};
