const mongoose = require("mongoose");
const UserSchema = mongoose.Schema(
    {
        userName: String,
        firstName: String,
        lastName: String,
        email: String,
        role: String,
        password: String,
        about: String,
        streetAddress: String,
        city: String,
        state: String,
        zip: String,
        country: String,
        profileImgUrl: String
    }, {
        timestamps: true
    }
);

module.exports = mongoose.model('User', UserSchema);