import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import getConfigs from "../../config/config.js";

const Configs = getConfigs();
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 1,
    maxlength: 25,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    minlength: 5,
    maxlength: 50,
    required: [true, "Email ID Required"],
    trim: true,
    unique: [true, "Email ID already exist."],
  },
  password: { type: String, default: null, trim: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  deleted_at: { type: Date, default: null },
});

userSchema.methods.jwtToken = function (next) {
  try {
    return jwt.sign(
      { id: this._id, emailId: this.email_id },
      Configs.jwt.accessSecret,
      { expiresIn: Configs.jwt.accessOptions.expiresIn || "24hr" }
    );
  } catch (error) {
    return next(error);
  }
};

const UserModel = mongoose.model("User", userSchema);

export default UserModel;
