var React = require('react');
var ReactDOM = require('react-dom');
var Router = require('react-router').Router;
var Route = require('react-router').Route;
var Redirect = require('react-router').Redirect;
var hashHistory = require('react-router').hashHistory;

var StartPage = require('./Startview/StartView');
var ProfilePage = require('./Profileview/ProfileView');
var Edit = require('./Profileview/Edit');

var NoMatch = React.createClass({
  render: function() {
    return (
      <h2>No match for the route</h2>
    );
  }
});

ReactDOM.render(
  (
    <Router history={hashHistory}>
      <Route path="/login" component={StartPage} />
      <Route path="/comments" component={ProfilePage} />
      <Route path="/comments/:id/:owner/:instruction/:title/:category/:rating" component={Edit} />
      <Redirect from="/" to="/login" />
      <Route path="*" component={NoMatch} />
    </Router>
  ),
  document.getElementById('main')
);