const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
// const qs = require('querystring');
const { google } = require('googleapis');
const path = require('path');
const apiRouter = require('./routes/api');

const app = express();

require('dotenv').config();

const CLIENT_ID = process.env.GOOGLE_OAUTH_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_OAUTH_CLIENT_SECRET;


app.use(express.json());

// app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('dist'));
app.get('/', (req, res) => {
  res.status(200).sendFile(path.resolve(__dirname, '../public/index.html'));
});

// access api router
app.use('/api', apiRouter);

/*
Google's OAuth 2.0 endpoint is at https://accounts.google.com/o/oauth2/v2/auth .
This endpoint is accessible only over HTTPS.
Useful doc: https://developers.google.com/identity/protocols/oauth2/web-server#httprest .
scope: https://www.googleapis.com/auth/userinfo.email
*/

const redirect_url = 'http://localhost:3000/google/callback';

const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  redirect_url,
);

// We just need the user's email address.
const scopes = [
  'https://www.googleapis.com/auth/userinfo.email',
  // 'https://www.googleapis.com/auth/userinfo.profile',
];

const url = oauth2Client.generateAuthUrl({
  // 'online' (default) or 'offline' (gets refresh_token)
  access_type: 'online',

  // If you only need one scope you can pass it as a string
  scope: scopes,
});

app.get('/google/auth', (req, res) => {
  res.redirect(url);
  console.log('User being redirected to /google/callback...');
});
app.get('/google/callback', async (req, res) => {
  console.log('Rigth before POST req for token.');
  console.log('req.query.code (before POST req):', req.query.code);
  // This will provide an object with the access_token and refresh_token.
  // Save these somewhere safe so  they can be used at a later time.
  const { tokens } = await oauth2Client.getToken(req.query.code);
  oauth2Client.setCredentials(tokens);
  // "Tokens" is one BIG object w/ other useless info!
  // Make sure to extract just the 'access_token' to use it in the Authorization header (or query string) for the GET req below.
  // console.log('tokens:', tokens);
  const { access_token } = tokens;

  // Next, we save token in cookie.
  res.cookie('token', access_token);

  // We make a GET req to Google using access_token for userinfo (email)
  axios.get(`https://www.googleapis.com/oauth2/v2/userinfo?access_token=${access_token}`)
    .then((response) => {
      // console.log('response:', response);
      console.log('response.data:', response.data);
      res.send(response.data);
    })
    .catch((err) => {
      console.log('Error in GET req:', err);
      res.sendStatus(500);
    });
});

// catches bad routes
app.use('*', (req, res) => {
  res.status(404).send('Not Found');
});

// global error handler
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send('Server Error');
});

// app.listen(process.env.PORT || 8080, () => console.log(`Listening on port ${process.env.PORT || 8080}!`));
app.listen(3000, () => console.log('Listening on port 3000...'));

module.exports = app;
