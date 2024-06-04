const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
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
  verified: {
    type: Boolean,
  },
  img_count: {
    type: Number,
  },
  recent: {
    type: Array,
  },
  createdAt: {
    type: Date,
    required: true
  },
  lastModified: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model("users", UserSchema);
