const authJwt = require("../config/authJwt");
const { makeHandlerAwareOfAsyncErrors } = require("../helpers/helper");

module.exports = (app) => {
    const commentController = require('../controllers/comment.controller');
    app.get(
        "/getCommentsByIdEmployee/:idEmployee",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(commentController.getCommentsByIdEmployee)
    );

    app.post(
        "/createComment",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(commentController.createComment)
    )
}