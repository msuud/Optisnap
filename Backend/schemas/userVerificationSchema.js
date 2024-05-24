const mongoose = require("mongoose");

const UserVerificationSchema = new mongoose.Schema(
    {
        "uid" : String,
        "uString" : String,
        "createdAt" : Date,
        "updatedAt" : Date 
    }
)

module.exports = mongoose.model("user-verifications", UserVerificationSchema)