var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Filter = require('./Filter');
var Add = require('./Add');
var CommentList = require('./List');
var Button  = require('react-bootstrap/lib/Button');
var hashHistory = require('react-router').hashHistory;

var ProfileView = React.createClass({
  getInitialState: function() {
    return {comments: []};
  },
  render: function() {
    console.log("Rendering ProfileView, num items:", this.state.comments.length);
    return (
      <div>
        <h1>Can i fix it?</h1>
        
        <h3> Search for anything you need help fixing</h3>
        <Button bsStyle="primary" onClick={this.logout}>Log out</Button>
        <br/>
        <h5 id="currentUser"></h5><br/><br/>

        <Filter submitHandler={this.changeFilter} initFilter={this.props.location.query}/>
       <CommentList comments={this.state.comments} />
        <Add Add={this.add}/>
      </div>
    )
  },

  componentDidMount: function() {
    console.log("ProfileView: componentDidMount");
    this.loadData();
  },

  componentDidUpdate: function(prevProps) {
    this.isLoggedIn();
    var oldQuery = prevProps.location.query;
    var newQuery = this.props.location.query;
    if (oldQuery.priority === newQuery.priority &&
        oldQuery.category === newQuery.category) {
      console.log("ProfileView: componentDidUpdate, no change in filter, not updating");
      return;
    } else {
      console.log("ProfileView: componentDidUpdate, loading data with new filter");
      this.loadData();
    }
  },

  loadData: function() {
    var query = this.props.location.query || {};
    var filter = {priority: query.priority, category: query.category};
    
    $.ajax('/api/comments', {
      data: filter,
      success: function(data){
        console.log(data);
        //when data returns an error message from passport
        if(data.message){
            if(data.success) this.setState({comments: data});
            else hashHistory.push('/login');
        }
        //when data returns all comment objects
        else{
          this.setState({comments: data});
        }
        
    }.bind(this),
    error: function(err) {
            console.log("Error:", err);
        }
      });
  },

  changeFilter: function(newFilter) {
    this.props.history.push('comments?' + $.param(newFilter));
  },

  add: function(comment) {
    this.isLoggedIn();
    console.log(comment);
    comment.owner = this.state.owner;
    console.log("Adding comment:", comment);
    $.ajax({
      type: 'POST', 
      url: '/api/comments', 
      contentType: 'application/json',
      data: JSON.stringify(comment),
      success: function(data) {
        var comment = data;
        var commentsModified = this.state.comments.concat(comment);
        this.setState({comments: commentsModified});
      }.bind(this),
      error: function(xhr, category, err) {
        // ideally, show error to user.
        console.log("Error adding comment:", err);
      }
    });
  },

  logout: function(e){
    e.preventDefault();

    $.ajax({
        url: '/api/logout/', 
        type: 'GET',
        success: function(data){
          console.log("data.success", data.success);
          hashHistory.push('/login');
        }.bind(this),
        error: function(err){
          console.log("err: ", err);
        }
    });
  },

  isLoggedIn: function(){
    $.ajax('/api/login/', {
      type: 'GET',
      success: function(data){
        if(!data.success) hashHistory.push('/login');  
        else{
          document.getElementById('currentUser').innerHTML = data.message;
          this.state.owner = data.message;
        } 
    
        }.bind(this),
      error: function(err) {
            console.log("Error:", err);
        }
      });
  }
});

module.exports = ProfileView;