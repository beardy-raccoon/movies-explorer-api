const router = require('express').Router();
const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  '756343850111-2atof4hidinss8k7ec8qshnh5h91fta6.apps.googleusercontent.com',
  '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',
  'http://raccoondiploma.nomoredomains.sbs/oauth/google/redirect',
);

const scope = [
  'https://www.googleapis.com/auth/userinfo.email',
  'https://www.googleapis.com/auth/userinfo.profile',
];

router.get('/google', (req, res) => {
  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope,
  });
  res.redirect(url);
});

/* router.get('google/redirect', async (req, res) => {
  const { code } = req.query.code;

  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);

  const response = fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokens.access_token}`,
    },
  }).then(res.json);

  const user = response.data;
}); */

module.exports = router;
