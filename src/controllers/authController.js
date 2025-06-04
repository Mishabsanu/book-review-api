import Joi from "joi";
import sanitize from "mongo-sanitize";
import getConfigs from "../config/config.js";
import UserModel from "../database/schema/User.js";
import { create, verify } from "../utils/authServices/index.js";

const Configs = getConfigs();

const authSchema = Joi.object({
  name: Joi.string().min(3).max(50),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export const signup = async (req, res) => {
  try {
    const sanitized = sanitize(req.body);
    const { error, value } = authSchema.validate(sanitized);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, email, password } = value;

    const existingUser = await UserModel.findOne({ email }).lean();
    if (existingUser) {
      return res.status(409).json({ message: "Email already registered" });
    }

    const hashedPassword = await create(password);

    const newUser = new UserModel({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      message: "User registered successfully",
      result: savedUser,
      status: true,
    });
  } catch (err) {
    console.error("Signup Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const origin = req.get("Origin");
    const sanitized = sanitize(req.body);
    const { error, value } = authSchema.validate(sanitized);

    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { email, password } = value;

    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await verify(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = user.jwtToken();
    const options = {
      expires: new Date(
        Date.now() + Configs.cookie.cookie_expire * 24 * 60 * 60 * 1000
      ),
      httpOnly: true,
      secure: true,
      sameSite: "None",
    };

    res.header("Access-Control-Allow-Origin", origin);
    res.header("Access-Control-Allow-Credentials", "true");

    return res.status(200).cookie("token", token, options).json({
      message: "Login successful",
      token,
      result: user,
      status: true,
    });
  } catch (err) {
    console.error("Login Error:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};
