const authJwt = require("../config/authJwt");
const multer = require("multer");
const { makeHandlerAwareOfAsyncErrors } = require("../helpers/helper");

module.exports = (app) => {
    const employeeController = require('../controllers/employee.controller');
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, "./store/");
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);
        },
      });
    let upload = multer({ storage: storage });

    app.get(
        "/getEmployee/:idEmployee",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(employeeController.getEmployee)
    );

    app.get(
        "/getAllEmployees",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(employeeController.getAllEmployees)
    );

    app.post(
        "/createEmployee",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(employeeController.createEmployee)
    );

    app.post(
        "/createMultipleEmployees",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(employeeController.createMultipleEmployees)
    );

    app.put(
        "/updateEmployee/:idEmployee",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(employeeController.updateEmployee)
    );

    app.delete(
        "/deleteEmployee/:idEmployee",
        [authJwt.verifyToken],
        makeHandlerAwareOfAsyncErrors(employeeController.deleteEmployee)
    );

    app.post(
        "/uploadProfileImg",
        [authJwt.verifyToken,  upload.single("file")],
        makeHandlerAwareOfAsyncErrors(employeeController.uploadProfileImg)
    )
};