var React = require('react');
var ReactDOM = require('react-dom');
var FormGroup = require('react-bootstrap/lib/FormGroup');
var Col = require('react-bootstrap/lib/Col');
var ControlLabel = require('react-bootstrap/lib/ControlLabel');
var FormControl = require('react-bootstrap/lib/FormControl');
var Button  = require('react-bootstrap/lib/Button');
var Form = require('react-bootstrap/lib/Form');

var Filter = React.createClass({
  render: function() {
    console.log("Rendering Filter, state=", this.state);
    return (
      <div  style={{minHeight: 50}}>
      <Form inline>
        <FormGroup controlId="formControlsSelect">
          <ControlLabel>Category</ControlLabel>
          {'  '}
          <FormControl componentClass="select" placeholder="category" value={this.state.category} onChange={this.onChangeCategory}>
            <option value="">(Any)</option>
            <option value="Bike">Bike</option>
            <option value="Relationship">Relationship</option>
            <option value="Flowers">Flowers</option>
            <option value="Decoration">Decoration</option>
            <option value="School">School</option>
          </FormControl>
          </FormGroup>
        {'  '}
        
       <Button bsStyle="primary" onClick={this.submit} >Apply</Button>
     </Form>
      </div>
    )
  },

  getInitialState: function() {
    var initFilter = this.props.initFilter;
    return {category: initFilter.category, priority: initFilter.priority};
  },

  componentWillReceiveProps: function(newProps) {
    if (newProps.initFilter.category === this.state.category
        && newProps.initFilter.priority === this.state.priority) {
      console.log("Filter: componentWillReceiveProps, no change");
      return;
    }
    console.log("Filter: componentWillReceiveProps, new filter:", newProps.initFilter);
    this.setState({category: newProps.initFilter.category, priority: newProps.initFilter.priority});
  },

  onChangeCategory: function(e) {
    console.log("onChangeCategory: ", e.target.value);
    this.setState({category: e.target.value});
  },
  onChangePriority: function(e) {
    console.log("onChangePriority: ", e.target.value);
    this.setState({priority: e.target.value});
  },

  submit: function(e) {
    var newFilter = {};
    if (this.state.priority) newFilter.priority = this.state.priority;
    if (this.state.category) newFilter.category = this.state.category;
    console.log("newFilter: ", newFilter);
    this.props.submitHandler(newFilter);
  }
});

module.exports = Filter;