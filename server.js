const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connection');
const passport = require('password');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;

const port = process.env.PORT || 3002;
const app = express();

app
  .use(bodyParser.json())
  .use(session({
    secret:"secret",
    resave: false,
    saveUninitialized: true ,
  }))
  // basic express session ({...}) initialization.
  .use(passport.initialize())
  // it passport on every route call
  .use(passport.session())
  // allow passport to use "express-session".
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Request-With, content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(cors({ methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']}))
  .use(cors({ origin: '*'}))
  .use('/', require('./routes'));

  passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
  },
  function(accessToken, refreshToken, profile, done) {
    //User.find)rCreate({ githubId: profile.id }, functionn{err, user} {
      return done(null, profile);
    //})
  }
))
  
passport.serializeUser((user, done) => {
  done(null, user);
});
passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false
}),
(req, res) => {
  req.session.user = req.user;
  res.redirect('/');
});

process.on('uncaughtException', (err, origin) => {
    console.log(process.stderr.fd, `Caught exception: ${err}\n` + `Exception origin: ${origin}`);
  });
mongodb.initDb((err) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port);
        console.log(`Connected to DB and listening on ${port}`);
    }
});