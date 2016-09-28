var mongoose = require("mongoose");

module.exports = function(app, passport) {

  app.get('/', function(req, res) {
    console.log("hejhej");
});

/*Check if logged in*/
app.get('/api/login/', isLoggedIn, function(req, res) {
  res.send({ success : true, message : req.user.local.email });
});


/*Login*/
app.post('/api/login/', function(req, res, next) {
  passport.authenticate('local-login', function(err, user, info) {
    console.log("inne i post: ", user);
    if (err) {
      return next(err);
    }
    if (! user) {
      return res.send({ success : false, message : req.flash('loginMessage') });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : req.flash('loginMessage'), email: user.local.email });
    });      
  })(req, res, next);
});


/*Signup*/
app.post('/api/signup/', function(req, res, next) {
  passport.authenticate('local-signup', function(err, user, info) {
    console.log("inne i post: ", user);
    if (err) {
      return next(err);
    }
    if (! user) {
      return res.send({ success : false, message : req.flash('signupMessage') });
    }
    req.login(user, loginErr => {
      if (loginErr) {
        return next(loginErr);
      }
      return res.send({ success : true, message : req.flash('signupMessage') });
    });      
  })(req, res, next);
});


app.get('/api/logout/', function(req, res) {
    req.logout();
    res.send({ success : false, message : 'not logged in' });
    //res.redirect('/login');
});


function isLoggedIn(req, res, next) {
  console.log("isLoggedIn: ", req.isAuthenticated());

    if (req.isAuthenticated())
        return next();

    res.send({ success : false, message : 'not logged in' });
  }
};
