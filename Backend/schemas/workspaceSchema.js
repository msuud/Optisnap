const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// const {userschema} = mongoose.Schema;

const WorkspaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    uid: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    images: {
      type: Array,
    },
  },
  { unique: true, index: { fields: ["uid", "name"] } }
);

module.exports = mongoose.model("workspaces", WorkspaceSchema);
