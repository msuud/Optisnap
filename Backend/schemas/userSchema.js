const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  workspaces: {
    type: Array,
  },
  verified: {
    type: Boolean,
  },
});

module.exports = mongoose.model("users", UserSchema);
