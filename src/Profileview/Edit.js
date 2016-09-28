var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Col = require('react-bootstrap/lib/Col');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button  = require('react-bootstrap/lib/Button');
var $ = require('jquery');
var Link = require('react-router').Link;
var hashHistory = require('react-router').hashHistory;


var Edit = React.createClass({
	render: function(){
	return (
	 <div style={{maxWidth: 600}}>

   <br/>
      <Form horizontal name="Edit">
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="title" value={this.state.title} onChange={this.onChangeTitle} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <Col componentClass={ControlLabel} sm={2}>
            Instruction
          </Col>
          <Col sm={10}>
            <FormControl componentClass="textarea" name="instruction" value={this.state.instruction}  onChange={this.onChangeInstruction} />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            Category
          </Col>
          <Col sm={10}>
          <FormControl componentClass="select" name="category" placeholder="select" value={this.state.category} onChange={this.onChangeCategory}>
            <option value="">Any</option>
            <option value="Bike">Bike</option>
            <option value="Relationship">Relationship</option>
            <option value="Flowers">Flowers</option>
            <option value="Decoration">Decoration</option>
            <option value="School">School</option>
          </FormControl>
          </Col>
        </FormGroup>

        <FormGroup>
          <Col smOffset={2} sm={10}>
            <Button onClick={this.addChanges}>Add</Button>
            <Link className="btn btn-default" role="button" 
              to='/comments'>
            Go back
            </Link>
            <Button onClick={this.remove}>Remove</Button><br/>
            <p id="responseEdit"></p>
          </Col>
        </FormGroup>
      </Form>
    </div>
    );
	},

  getInitialState: function(){
    //hämta aktuella values
    return {owner: this.props.params.owner,
    title: this.props.params.title,
    instruction: this.props.params.instruction,
    category: this.props.params.category,
    rating: this.props.params.rating};
  },
  componentDidMount: function(){
    this.isLoggedIn();
  },
  onChangeCategory: function(e) {
    this.setState({category: e.target.value});
  },
  onChangeTitle: function(e) {
    this.setState({title: e.target.value});
  },
  onChangeInstruction: function(e) {
    this.setState({instruction: e.target.value});
  },

  addChanges: function(e) {
    e.preventDefault();
    var comment = {
      owner: this.props.params.owner,
      title: this.state.title,
      instruction: this.state.instruction,
      category: this.state.category,
      rating: this.state.rating
    }

    console.log("comment: ", comment);

    $.ajax({
      url: '/api/comments/' + this.props.params.id, type: 'PUT', 
      contentType:'application/json',
      data: JSON.stringify(comment),
      dataType: 'json',
      success: function(comment) { 
        console.log("message: ", comment);
        this.setState(comment);
        document.getElementById('responseEdit').innerHTML = 'Changes added';
      }.bind(this),
    });
  }, 
  remove: function(e){
    e.preventDefault();
    var form = document.forms.Edit;

    $.ajax({
        url: '/api/comments/' + this.props.params.id, 
        type: 'DELETE', 
        contentType:'application/json',
        dataType: 'json',
        success: function(data){
          document.getElementById('responseEdit').innerHTML = 'Removed';
          form.title.value = "",
          form.instruction.value = "",
          form.category.value = "";
        }.bind(this),
        error: function(xhr, category, err) {
            console.log("Error user:", err);
          }
        });
  },
  isLoggedIn: function(){
    $.ajax('/api/login/', {
      type: 'GET',
      success: function(data){
        if(!data.success) hashHistory.push('/login'); 
        //else this.loadData();      
        }.bind(this),
      error: function(err) {
            console.log("Error:", err);
        }
      });
  }
});

module.exports = Edit;