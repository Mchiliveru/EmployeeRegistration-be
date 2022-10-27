const Employee = require("../models/employee.model");
const moment = require("moment");
const { rename } = require("fs");

const getEmployee = async(req, res) => {
    const employeeId = req.params.idEmployee;
    if(!employeeId){
        return res.status(400).send({message: "Invalid employeeId"});
    }
    try {
        const employee = await Employee.findOne({_id: employeeId}).populate("comments");
        if(!employee) {
            return res.status(400).send({message: "Employee not found"});
        }
        res.status(200).json(employee);
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while fetching employee"});
    }
};

const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find();
        res.status(200).json(employees);
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while getting employees"});
    }
};

const createEmployee = async (req, res) => {
    try {
        const {userName, firstName, lastName, email, role, joinedOn, about, address, profileImgUrl} = req.body;
        const isEmployeePresent = await Employee.findOne({$or: [{userName: userName}, {email: email}, {firstName: firstName}, {lastName: lastName}]});
        if(isEmployeePresent) {
            return res.status(400).send({message: "Employee is already exists"});
        }
        const employee = new Employee({
            userName, firstName, lastName,  email, role, joinedOn, about, address, profileImgUrl
        });
        const newEmployee = await employee.save();

        res.status(200).send({messsage: `Employee Created successfully with: ${newEmployee._id}`});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while Creating Employee"});
    }
};

const updateEmployee = async(req, res) => {
    const idEmployee = req.params.idEmployee;
    if(!idEmployee) {
        res.status(400).send({message: "Invalid id employee"});
    }
    try {
        const employee = await Employee.findOne({_id: idEmployee});
        if(!employee) {
            return res.status(400).send({message: "Employee not found"});
        }
        await Employee.updateOne({_id: idEmployee}, {$set: req.body});
        res.status(200).send({message: "Employee details updated successfully"});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong whilte updating employee"});
    }
};

const deleteEmployee = async (req, res) => {
    const idEmployee = req.params.idEmployee;
    if(!idEmployee) {
        return res.status(400).send({message: "Invalid idEmployee"});
    }
    try {
        const employee = await Employee.findOne({_id: idEmployee});
        if(!employee){
            return res.status(400).send({message: "Employee not found"});
        }
        await Employee.deleteOne({_id: idEmployee});
        res.status(200).send({message: "Employee deleted successfully"});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while deleting employee"});
    }
};

const createMultipleEmployees = async (req, res) => {
    try {
        await Employee.insertMany(req.body);
        res.status(200).send({message: "Employees created successfully"});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while creating"});
    }
};

const uploadProfileImg = async (req, res) => {
    const date = moment().unix();
    try {
        let fileName = req.body.userName+'-'+date+'-'+req.file.filename;
        const employee = await Employee.findOne({_id: req.body.empId});
        if(!employee) {
            return res.status(400).send({message: "Employee not found"});
        }

        const path = 'store/pictures/' + fileName;
        const staticPath = 'static/pictures/'+fileName;

        rename(req.file.path, path, (err) => {
            if (err) throw err;
        });

        await Employee.updateOne({_id: employee._id}, {$set: {profileImgUrl: staticPath}});
        res.status(200).send({message: "Uploaded successfully"});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while uploading image"});
    }
};

module.exports = {
    getEmployee,
    updateEmployee,
    createEmployee,
    deleteEmployee,
    getAllEmployees,
    uploadProfileImg,
    createMultipleEmployees
}