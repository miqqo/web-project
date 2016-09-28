var mongoose = require("mongoose");
var commentSchema = mongoose.Schema({
    owner: String,
    title: String,
    instruction: String,
    category: String,
    rating: Number
});

module.exports = mongoose.model("comments", commentSchema);