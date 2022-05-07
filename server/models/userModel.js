const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  usernameOrEmail: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    default: true
  }
});

module.exports = mongoose.model('user', userSchema);