var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var passport = require('passport');
var flash = require('connect-flash');
var morgan = require('morgan');
var mongoose = require('mongoose');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
var configDB = require('./config/database.js');
var commentController = require("./controllers/commentController");


app.use(morgan('dev')); // log every request to the console
app.use(cookieParser());
app.use(bodyParser.json());

app.use(session({ secret: 'canifixityesican',
				  saveUninitialized: true,
                  resave: true }));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash());

app.use(express.static('static'));
app.use("/api", commentController);


mongoose.connect(configDB.url, function (err, res) {
  if (err) {
  console.log ('ERROR connecting: ' + err);
  } else {
  console.log ('Connected');
  }
});

require('./config/passport')(passport);
require('./config/passportRoutes.js')(app, passport);


var server = app.listen(process.env.PORT || 3000, function() {
  var port = server.address().port;
  console.log("Started server at port", port);  

});

