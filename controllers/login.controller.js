const keyConfig = require("../config/key.config");
const User = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const registration = async (req, res) => {
  try {
    const {
      userName,
      firstName,
      lastName,
      email,
      role,
      password,
      about,
      streetAddress,
      city,
      state,
      zip,
      country,
      profileImgUrl,
    } = req.body;
    console.log("I am coming here");
    const user = await User.findOne({
      $or: [{ userName: userName }, { email: email }],
    });
    if (user) {
      return res.status(400).send({ message: "User is already exists" });
    }

    const newUser = new User({
      userName,
      lastName,
      firstName,
      email,
      role,
      password: bcrypt.hashSync(password, 8),
      about,
      streetAddress,
      city,
      state,
      zip,
      country,
      profileImgUrl,
    });
    await newUser.save();
    res.status(200).send({ message: "User created successfully" });
  } catch (error) {
    res.status(500).send({
      message: error.message || "Some error occurred while creating the User",
    });
  }
};

const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ $or: [{ userName }, { email: userName }] });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }
    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).send({ message: "Invalid password" });
    }
    const token = jwt.sign({ id: user._id }, keyConfig.secret_key, {
      expiresIn: 28800,
    });
    res.status(200).send({ message: "Login successfull", id: user._id, accessToken: token, username: user.userName});
  } catch (error) {
    res.status(500).send({ message: error.message || "Login failed" });
  }
};

const updateUserDetails = async(req, res) => {
    const idUser = req.params.idUser;
    if(!idUser) {
        return res.status(400).send({message: "Invalid userId"});
    }
    try {
        const user = await User.findOne({_id: idUser});
        if(!user){
            return res.status(400).send({message: "User not found"});
        }
        await User.updateOne({_id: idUser}, {$set: req.body});
        res.status(200).send({message: "User updated successfully"});
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while updating"});
    }
};

const getUser = async (req, res) => {
    const idUser = req.params.id;
    if(!idUser) {
        return res.status(400).send({message: "Invalid user id"});
    }
    try {
        const userDetails = await User.findOne({_id: idUser});
        res.status(200).json(userDetails);
    }
    catch(error) {
        res.status(500).send({message: error.message || "Something went wrong while fetching user"});
    }
};

module.exports = {
  login,
  getUser,
  registration,
  updateUserDetails
};
