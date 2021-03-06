const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phoneNum: {
    type: Number,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});
const User = mongoose.model("users", UserSchema);
module.exports = User;
