const Comment = require('../models/comment.model');

const getCommentsByIdEmployee = async(req, res) => {
    const idEmployee = req.params.idEmployee;
    if(!idEmployee) {
        return res.status(400).send({message: "Invalid id employee"});
    }
    try {
        const comments = await Comment.find({employeeId: idEmployee})
        .populate("employeeId")
        .populate("authorId", "_id firstName lastName");
        res.status(200).send(comments);
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while getting comments"});
    }
};

const createComment = async(req, res) => {
    try {
        const {comment, authorId, employeeId} = req.body;
        const newComment = new Comment({
            comment,
            authorId,
            employeeId
        });
        await newComment.save();
        res.status(200).send({message: "Comment saved successfully"});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while creating"});
    }
}
module.exports = {
    createComment,
    getCommentsByIdEmployee
}