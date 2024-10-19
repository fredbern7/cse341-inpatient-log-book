const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
const mongoDB = require('./db/connection.js');
const passport = require('passport');
const session = require('express-session');
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');

const port = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());

app.use(cors({ origin: '*', methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'] }));

app.use("/", require("./routes/index.js"));

passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
    return done(null, profile);
}));

passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

app.get('/', (req, res) => {
    res.send(req.session.user ? `Logged in as ${req.session.user}` : "Logged Out");
});

app.get('/auth/github/callback', (req, res, next) => {
    passport.authenticate('github', (err, user, info) => {
        if (err) {
            console.error('Error during authentication:', err);
            return res.redirect('/api-docs');
        }
        if (!user) {
            console.log('No user found:', info);
            return res.redirect('/api-docs');
        }
        req.session.user = user;
        res.redirect('/');
    })(req, res, next);
});

mongoDB.initDb((err, mongoDB) => {
    if (err) {
        console.log(err);
    } else {
        app.listen(port, () => {
            console.log(`App started on Port ${port}`);
        });
    }
});
