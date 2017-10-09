require('dotenv').config();
var express = require('express');
var ejsLayouts = require('express-ejs-layouts');
var bodyParser = require('body-parser');
var db = require('./models');
var app = express();

var dotenv = require('dotenv');
var path = require('path');
var session = require('express-session');
var flash = require('connect-flash');
var isLoggedIn = require('./middleware/isLoggedIn');

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(ejsLayouts);
app.use(express.static(path.join(__dirname, 'public')));

/*
 * setup the session with the following:
 *
 * secret: A string used to "sign" the session ID cookie, which makes it unique
 * from application to application. We'll hide this in the environment
 *
 * resave: Save the session even if it wasn't modified. We'll set this to false
 *
 * saveUninitialized: If a session is new, but hasn't been changed, save it.
 * We'll set this to true.
 */
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}));

app.use(flash());

app.use(function(req, res, next) {
  // before every route, attach the flash messages and current user to res.locals
  res.locals.alerts = req.flash();
  res.locals.currentUser = req.user;
  next();
});

//these lines MUST occur after the session is configured
var passport = require('./config/ppConfig');
app.use(passport.initialize());
app.use(passport.session());

app.locals.venueData = require('./data.json');



app.get('/', function(req, res) {
  res.render('index');
});

app.get('/events', function(req,res){
  var events = 'http://api.songkick.com/api/3.0/venues/' + venueData.id + '/calendar.json?apikey=' + DA_KEY;

  require('http').request(events, function(error, response, body){
    var eventsParsed = JSON.parse(body);
    var name = resultsPage.results.event.displayName;
    var date = resultsPage.results.start.date;
    var time = resultsPage.results.start.time;
    var restrictions = resultsPage.results.event.ageRestrictions;
  });
  res.render('events');
});

//favorites
app.get('/profile', isLoggedIn, function(req, res) {
  res.render('profile');
});

app.post('/', function(req,res){
  db.favorites.create(req.body).then(function(favorites){
    res.redirect('/profile');
  }).catch(function(err){
    res.status(500).render('error');
  });
});


app.use('/auth', require('./controllers/auth'));

var server = app.listen(process.env.PORT || 3000);

module.exports = server;
