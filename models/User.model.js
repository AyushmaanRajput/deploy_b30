const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: String,
    firtname: String,
    lastname: String,
    email: String,
    password: String,
    gender: String,
  },
  {
    versionKey: false,
  }
);

const User = mongoose.model("user", userSchema);

module.exports = { User };
