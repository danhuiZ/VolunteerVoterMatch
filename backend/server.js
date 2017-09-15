"use strict";

const path = require('path');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const axios = require('axios');
const bodyParser = require('body-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const session = require('express-session');
const cors = require('cors')
const { Volunteer, Voter } = require('./models.js');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());
app.use(express.static('./build'));

//MongoDB connection
var mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI, function(err) {
  if(err) {
    console.log('Error connecting to MongoDB', err);
  } else {
    console.log('Connected to MongoDB:)');
  }
});

// PASSPORT FLOW
passport.serializeUser(function(volunteer, done) {
  done(null, volunteer._id);
});
passport.deserializeUser(function(id, done) {
  Volunteer.findById(id, function(err, volunteer) {
    done(err, volunteer);
  });
});
passport.use(new LocalStrategy(function(username, password, done) {
  // Find the user with the given username
  Volunteer.findOne({ username: username }, function (err, volunteer) {
    // if there's an error, finish trying to authenticate (auth failed)
    if (err) {
      console.log(err);
      return done(err);
    }
    // if no user present, auth failed
    if (!volunteer) {
      return done(null, false, { message: 'Incorrect username.' });
    }
    // if passwords do not match, auth failed
    if (volunteer.password !== password) {
      return done(null, false, { message: 'Incorrect password.' });
    }
    // auth has has succeeded
    return done(null, volunteer);
  });
}));

app.use(session({ secret: 'KarenMichigan' }));
app.use(passport.initialize());
app.use(passport.session());

// app.get('/', auth(passport));

app.post('/login', passport.authenticate('local', { failureRedirect: '/failed' }),function(req, res) {
  res.json({success: true, volunteer: req.user});
});

app.get('/failed', function(req, res) {
  res.json({success: false});
});

app.post('/register', function(req, res) {
  console.log("HERE'S SERVER SIDE req.body: ", req.body);
  var newVolunteer = new Volunteer({
    username: req.body.username,
    password: req.body.password,
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    middleInitial: req.body.middleInitial,
    dob: req.body.dob,
    politicalInterest: req.body.politicalInterest,
    // votersToContact: req.body.votersToContact    // Array? ref?
  });
  newVolunteer.save(function(err, volunteer) {
    if (err) {
      console.log(err);
      return;
    } else {
      console.log(volunteer);
      res.json({success: true, volunteer: volunteer});
      return;
    }
  });
});

app.listen(PORT, error => {
    error
    ? console.error(error)
    : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`);
});