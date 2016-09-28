var React = require('react');
var ReactDOM = require('react-dom');
var Link = require('react-router').Link;
var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Col = require('react-bootstrap/lib/Col');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var FormControl = require('react-bootstrap/lib/FormControl');
var Checkbox = require('react-bootstrap/lib/Checkbox');
var Button  = require('react-bootstrap/lib/Button');
var $ = require('jquery');
var hashHistory = require('react-router').hashHistory;


var Signin = React.createClass({
	render: function(){
		return (
			<div>
			<h3>Sign in</h3>
			<Form horizontal name="Login">
			    <FormGroup controlId="formHorizontalEmail">
			      <Col componentClass={ControlLabel} sm={2}>
			        Email
			      </Col>
			      <Col sm={10}>
			        <FormControl type="email" placeholder="Email" name="email"/>
			      </Col>
			    </FormGroup>

			    <FormGroup controlId="formHorizontalPassword">
			      <Col componentClass={ControlLabel} sm={2}>
			        Password
			      </Col>
			      <Col sm={10}>
			        <FormControl type="password" placeholder="Password" name="password"/>
			      </Col>
			    </FormGroup>

			    <FormGroup>
			      <Col smOffset={2} sm={10}>
			        <Button type="submit" onClick={this.submit}>
			          Sign in
			        </Button>
			      </Col>
			      <Col smOffset={2} sm={10}>
			        <p id="responseLogin"></p>
			      </Col>
			    </FormGroup>
			  </Form>
			</div>
		    
		)
	},

	getInitialState: function(){
		return{user: []}
	},
	submit: function(e){

		e.preventDefault();
		var form = document.forms.Login;
		var user = {
			email: form.email.value,
			password: form.password.value
		}
		console.log(user);

		$.ajax({
	      url: '/api/login/', 
	      type: 'POST', 
	      contentType:'application/json',
	      data: JSON.stringify(user),
	      dataType: 'json',
	      success: function(data) {
	      	if(data.success){
	      		var userEmail = data.email;
	      		console.log("user", userEmail);
	      		this.setState({user: userEmail})
      			hashHistory.push('/comments');
	      	}
	      	else{
	      		console.log(data.message);
	      		document.getElementById('responseLogin').innerHTML = data.message;
	      	}   
	      }.bind(this),
	      error: function(err) {
	      		console.log("Error user:", err);
		    	}
	      });
	}
    
})

module.exports = Signin;