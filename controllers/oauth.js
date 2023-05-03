const { google } = require('googleapis');
const axios = require('axios');
const User = require('../models/users');
require('dotenv').config();

const NotFoundError = require('../errors/not-found-error');
const { MESSAGE } = require('../utils/consts');

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

  const user = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: { 'Authorization': 'Bearer ' + tokens.access_token, "Content-Type": "application/json" },
  });

  // const { id, email, name } = user.data;

  User.findOne(user.data.email)
    .then((findedUser) => {
      if (!findedUser) {
        throw new NotFoundError(MESSAGE.NOT_FOUND_USER);
      }
      res.send({
        data: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
      });
    });

  res.send({ message: user.data });
};

module.exports = {
  getAuthUrl,
  getAuthData,
};
