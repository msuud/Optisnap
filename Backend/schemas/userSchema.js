const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        "username": {
            type: String,
            required: true,
            unique: true
        },
        "email": {
            type: String,
            required: true,
            unique: true
        },
        "name": {
            type: String,
            required: true
        },
        "password": {
            type: String,
            required: true
        },
        "workspaces": {
            type: Array,
        }
    }
)

module.exports = mongoose.model("users", UserSchema)