const mongoose = require("mongoose");
const EmployeeSchema = mongoose.Schema(
    {
        userName: String,
        firstName: String,
        lastName: String,
        email: String,
        role: String,
        about: String,
        joinedOn: String,
        address: String,
        comments: [
            { 
                type: mongoose.Schema.ObjectId,
                ref: 'Comment'
            }
        ]
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('Employee', EmployeeSchema);