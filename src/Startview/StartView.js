var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var hashHistory = require('react-router').hashHistory;

var Signin = require('./Signin');
var Signup = require('./Signup');

var StartPage = React.createClass({
	
	render: function(){
		console.log("Rendering StartPage");
		return (
			<div>
				<h1>Welcome!</h1>
				<Signin/>
				<Signup/>
			</div>
	)},
	getInitialState: function(){
		return {};
	},
	componentDidMount: function() {
    console.log("ProfileView: componentDidMount");
    this.isLoggedIn();
  },
  isLoggedIn: function(){
  	$.ajax('/api/login/', {
      type: 'GET',
      success: function(data){
      	 console.log("isLoggedIn: ", data.success);
      	if(data.success) hashHistory.push('/comments');       
        }.bind(this),
    	error: function(err) {
            console.log("Error:", err);
        }
      });
  }
});


module.exports = StartPage;
	
