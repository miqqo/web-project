var React = require('react');
var ReactDOM = require('react-dom');
var $ = require('jquery');
var Button  = require('react-bootstrap/lib/Button');
var Link = require('react-router').Link;
var Panel = require('react-bootstrap/lib/Panel');


var CommentList = React.createClass({
  render: function() {
     console.log("Rendering comment table, num items:", this.props.comments.length);

    if(this.props.comments){
      var CommentRows = this.props.comments.map(function(comment) {
      return <CommentRow key={comment._id} comment={comment} />
      });
    }
    else hashHistory.push('/login');

    return (
      <div>
        {CommentRows}<br/>
        
      </div>
    )
  }
});

var CommentRow = React.createClass({
  render: function() {
    const title = (
      <h3>{this.props.comment.title}</h3>
    );
    return (
      <div>
        <Panel header={title} bsStyle="info">
          {this.props.comment.instruction}
          <br/>     
          {this.state.showEdit ? <EditButton key={this.props.comment._id} comment={this.props.comment}/> : null}     
            <Button onClick={this.upvote}>Like</Button><br/>
            Points: {this.props.comment.rating} <br/>
            owner: {this.props.comment.owner} <br/>
            category: {this.props.comment.category}
        </Panel>
      </div>
    )
  },
  getInitialState: function(){
    return { showEdit: false };
  },
  componentDidMount: function() {
    this.getCurrentUser(); 
  },
  upvote: function(e){
    e.preventDefault();
    var comment = {
      owner: this.props.comment.owner,
      title: this.props.comment.title,
      instruction: this.props.comment.instruction,
      category: this.props.comment.category,
      rating: this.props.comment.rating + 1
    }
    $.ajax({
      type: 'PUT',
      url: '/api/comments/' + this.props.comment._id, 
      contentType: 'application/json',
      data: JSON.stringify(comment),
      dataType: 'json',
      success: function(data) {
        var comment = data;
        //hur uppdater man state så att ui:t uppdateras???
        this.setState({comments: comment});
  
      }.bind(this),
      error: function(xhr, category, err) {
        console.log("Error adding comment:", err);
      }
    });
  },
  getCurrentUser: function(){
    return $.ajax('/api/login/', {
      type: 'GET',
      success: function(data){
        if(!data.success) hashHistory.push('/login');  
        else{
          this.showButton(data.message, this.props.comment.owner);
        } 
    
        }.bind(this),
      error: function(err) {
            console.log("Error:", err);
        }
      });
  },
  showButton: function(userFromServer, currentUser){
    if(currentUser == userFromServer) this.setState({ showEdit: true });
  },
});

var EditButton = React.createClass({
    render: function() {
        return (
            <div id="showEditButton">
                <Link className="btn btn-default" role="button" 
              to={'/comments/' + this.props.comment._id + "/" 
              + this.props.comment.owner + "/" 
              + this.props.comment.instruction + "/"
              + this.props.comment.title + "/" 
              + this.props.comment.category + "/"
              + this.props.comment.rating } 
              params={{id: this.props.comment._id,
               owner: this.props.comment.owner,
                instruction: this.props.comment.instruction,
                title: this.props.comment.title,
                category: this.props.comment.category,
                rating: this.props.comment.rating }}>
            Edit
            </Link>
            </div>
        );
    }
});


module.exports = CommentList;