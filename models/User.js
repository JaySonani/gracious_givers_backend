const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: {type: String},
    user_id: { type: String, required: true, trim: true },
    password: { type: String, required: true },
    email: { type: String, required: true, trim: true },
    ngo_name: { type: String, required: true, trim: true },
    target_group: { type: String, required: true, trim: true },
    status: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
