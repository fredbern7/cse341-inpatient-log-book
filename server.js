const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoDB = require('./db/connection.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3002;
const app = express();

// Middleware Setup
app
  .use(bodyParser.json())
  .use(session({
    secret: 'secret', // Use a secure secret in production
    resave: false,
    saveUninitialized: true,
  }))
  .use(passport.initialize())
  .use(passport.session()) // To support persistent login sessions
  .use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  }))
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    res.setHeader(
      "Access-Control-Allow-Methods",
      "POST, GET, PUT, PATCH, OPTIONS, DELETE"
    );
    next();
  })
  .use("/", require("./routes/index.js"));

// Passport GitHub Strategy Setup
passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function (accessToken, refreshToken, profile, done) {
    return done(null, profile); // This is where you'd typically find or create the user in the database
  }
));

passport.serializeUser((user, done) => {
  done(null, user); // Serialize user to store user information in session
});

passport.deserializeUser((user, done) => {
  done(null, user); // Deserialize user from session
});

// Home Route
app.get('/', (req, res) => {
  res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged Out");
});

// GitHub OAuth Callback
app.get('/github/callback', passport.authenticate('github', {
    failureRedirect: '/api-docs', session: false }
  ), (req, res) => {
    req.session.user = req.user; // Store user in session
    res.redirect('/');
  }
);

// Initialize MongoDB and Start the Server
mongoDB.initDb((err, mongoDB) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`App started on Port ${port}`);
  }
});
