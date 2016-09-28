var React = require('react');
var ReactDOM = require('react-dom');
var Form = require('react-bootstrap/lib/Form');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Col = require('react-bootstrap/lib/Col');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button  = require('react-bootstrap/lib/Button');


var Add = React.createClass({
  render: function() {
    return (
    <div style={{maxWidth: 600}}>
      <Form horizontal name="Add">
        <FormGroup controlId="formHorizontalTitle">
          <Col componentClass={ControlLabel} sm={2}>
            Title
          </Col>
          <Col sm={10}>
            <FormControl type="text" name="title" placeholder="Title" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsTextarea">
          <Col componentClass={ControlLabel} sm={2}>
            Instruction
          </Col>
          <Col sm={10}>
            <FormControl componentClass="textarea" name="instruction" placeholder="Instruction" />
          </Col>
        </FormGroup>

        <FormGroup controlId="formControlsSelect">
          <Col componentClass={ControlLabel} sm={2}>
            Category
          </Col>
          <Col sm={10}>
          <FormControl componentClass="select" name="category" placeholder="select">
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
            <Button bsStyle="primary" onClick={this.handleSubmit}>
              Add
            </Button>
          </Col>
        </FormGroup>
      </Form>
    </div>
    )
  },

  handleSubmit: function(e) {
    e.preventDefault();
    var form = document.forms.Add;
    this.props.Add({owner: '',
                           title: form.title.value,
                          instruction: form.instruction.value, 
                          category: form.category.value, 
                          rating: 0});
    // clear the form for the next input
    form.title.value = "", form.instruction.value = "", form.category.value = "";
  }
});

module.exports = Add;