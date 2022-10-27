const mongoose = require("mongoose");
const CommentSchema = mongoose.Schema(
    {
        comment: String,
        employeeId: {type: mongoose.Schema.ObjectId, ref: 'Employee'}, 
        authorId: {type: mongoose.Schema.ObjectId, ref: 'User'}
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("Comment", CommentSchema);