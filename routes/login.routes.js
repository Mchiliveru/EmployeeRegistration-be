const authJwt = require("../config/authJwt");
const {makeHandlerAwareOfAsyncErrors} = require("../helpers/helper");

module.exports = (app) => {
    const loginController = require("../controllers/login.controller");
    app.post(
        "/registerUser",
        makeHandlerAwareOfAsyncErrors(loginController.registration)
    );

    app.post(
        "/login",
        makeHandlerAwareOfAsyncErrors(loginController.login)
    );

    app.put(
        "/updateUserDetails/:idUser",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(loginController.updateUserDetails)
    )
}
