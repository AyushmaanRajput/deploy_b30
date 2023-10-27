const { User } = require("../models/User.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.addUser = async (req, res, next) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(409)
        .json({ msg: "Email already exists, try loggin in!" });
    }
    const existingUsername = await User.findOne({ username: username });
    if (existingUsername) {
      return res
        .status(409)
        .json({ msg: "Username already exists, try a unique username!" });
    }
  } catch (err) {
    return res.status(400).json({ msg: "Something went wrong", error: err });
  }
  bcrypt.hash(password, 8, async function (err, hash) {
    if (err) {
      return res.json({ msg: "Something went wrong" });
    } else {
      const user = new User({ ...req.body, password: hash });
      await user.save();
      return res.status(201).json({
        msg: "User Succuessfully registeered!",
        user: user,
      });
    }
  });
};

exports.login = async (req, res, next) => {
  let { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(401).json({ msg: "Incorrect password" });
      } else {
        var token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY);
        return res
          .status(200)
          .json({ msg: "Successfully Logged In", token: token });
      }
    });
  } catch (err) {
    return res.status(500).json({ msg: "User not found" });
  }
};

exports.logout = (req, res, next) => {};
