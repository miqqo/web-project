var mongoose = require("mongoose");
var Comment = require("../data/comment");
var ObjectId = require('mongodb').ObjectID;
var _ = require("underscore");

var router = require("express").Router();
router.route("/comments/:id?")
    .get(isLoggedIn,getComments)
    .post(addComment)
    .delete(deleteComment)
    .put(editComment);


function getComments(req, res) {
    
    if(req.params.id){
        console.log("edit comment: ", req.params);
        console.log("edit comment: ", req.query);
        var id = ObjectId(req.params.id);
        Comment.find({_id: id}, function(err, comment) {
        if (err)
            res.send(err)
        else
            res.json(comment);
        });
    }
    else{
        console.log("get list of filtered records");
        var filter = {}
        if(req.query.priority){
            filter.priority = req.query.priority;
        }
        if(req.query.category){
            filter.category = req.query.category;
        }

        Comment.find(filter, function (err, comments) {
            if (err)
                res.send(err);
            else
                res.json(comments);
        });
    } 
}

function addComment(req, res) {
    console.log("Req body addComment:", req.body);
    var comment = new Comment(_.extend({}, req.body));
    comment.save(function (err) {
        console.log("comment: ", comment);
        console.log("err: ", err);
        if (err)
            res.send(err);
        else
            res.json(comment);
    });
}

function deleteComment(req, res) {
    console.log("Req body deleteComment:", req.body);
   var oid = ObjectId(req.params.id);
    Comment.remove({ _id: oid }, function (err, removed) {
        if (err)
            res.send(err)
        else
            res.json(removed);
    });
}

function editComment(req, res){
    console.log("Modifying comment:", req.params.id, req.body);

    var id = ObjectId(req.params.id);
    Comment.update({_id:id}, req.body, function(error, comment){
        Comment.find({_id:id}, function(err, doc){
            if (err)
                res.send(err)
            else
                res.json(doc);
        });
    })
}

function isLoggedIn(req, res, next) {
  console.log("isLoggedIn ", req.isAuthenticated());
    if (req.isAuthenticated())
        return next();

    res.send({ success : false, message : 'not logged in' });
}

module.exports = router;