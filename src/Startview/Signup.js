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


var Signup = React.createClass({
	render: function(){
		return (
			<div>
			<h3>Sign up</h3>
			<Form horizontal name="Signup">
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
			          Sign up
			        </Button>
			      </Col>
			      <Col smOffset={2} sm={10}>
			        <p id="responseSignup"></p>
			      </Col>
			    </FormGroup>
			  </Form>
			  <br/>
			</div>
		)
	},

	getInitialState: function(){
		return{}
	},

	submit: function(e){
		e.preventDefault();

		var form = document.forms.Signup;
		var user = {
			email: form.email.value,
			password: form.password.value
		}

		$.ajax({
	      url: '/api/signup/', 
	      type: 'POST', 
	      contentType:'application/json',
	      data: JSON.stringify(user),
	      dataType: 'json',
	      success: function(data) {
	      	if(data.success){
	      		document.getElementById('responseSignup').innerHTML = "User created";
	      		form.email.value = "";
	      		form.password.value = "";

	      	}
	      	else{
	      		console.log(data.message);
	      		document.getElementById('responseSignup').innerHTML = data.message;
	      	}  
	      }.bind(this),
	      error: function(err) {
		        console.log("Error:", err);
		    }
	      });
	}
    
})

module.exports = Signup;