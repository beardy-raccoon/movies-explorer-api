const { google } = require('googleapis');
const axios = require('axios');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const getToken = require('../utils/getToken');
const { API_URL, APP_URL } = require('../utils/consts');
require('dotenv').config();

const { CLIENT_ID, CLIENT_SECRET, DEFAULT_PASSWORD } = process.env;

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  `${API_URL}/oauth/google/redirect`,
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

const getAuthData = async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const user = await axios({
    url: 'https://www.googleapis.com/oauth2/v2/userinfo',
    method: 'get',
    headers: { Authorization: `Bearer ${tokens.access_token}`, 'Content-Type': 'application/json' },
  });

  const { email, name } = user.data;
  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    const hash = await bcrypt.hash(DEFAULT_PASSWORD, 10);
    const newUser = await User.create({ name, email, password: hash });
    getToken(res, newUser);
    res.redirect(`${APP_URL}/profile`);
  }
  getToken(res, foundUser);
  res.redirect(`${APP_URL}/movies`);
};

module.exports = {
  getAuthUrl,
  getAuthData,
};
