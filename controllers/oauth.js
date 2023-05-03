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

const getAuthUrl = (req, res, next) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
  });
  res.redirect(url);
  next();
};

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  throw new Error(res.status);
};

function getGoogle(tokens) {
  return fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${tokens.access_token}`,
      'Content-Type': 'application/json',
    },
  }).then((res) => checkResponse(res));
}

const getAuthData = async (req, res, next) => {
  const { code } = req.query.code;
  /* const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  const authData = getGoogle(tokens);
  const user = authData.data;
  const { _id } = user;
  req.session.user = { _id };
  await req.session.save(); */
  res.send(code);
  res.redirect('https://raccoondiploma.nomoredomains.sbs');
  next();
};

module.exports = {
  getAuthUrl,
  getAuthData,
};
