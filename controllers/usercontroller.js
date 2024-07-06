import { User } from "../models/usermodels.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { Types } from "mongoose";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(401).json({
        message: "fill all details",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "email is not register go to sign up page ",
        success: false,
      });
    }
    const ismatch = await bcryptjs.compare(password, user.password);
    if (!ismatch) {
      return res.status(401).json({
        message: "passowrd is incorrect",
        success: false,
      });
    }
    const tokedata = { id: Types.ObjectId };
    const token = await jwt.sign(
      tokedata,
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c",
      {
        expiresIn: "1h",
      }
    );
    return res
      .status(200)
      .cookie("token", token, { httpOnly: true })
      .json({
        message: `welecome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};
export const logout = async (req, res) => {
  return res
    .status(200)
    .cookie("token", "", { expiresIn: new Date(Date.now()), httpOnly: true })
    .json({
      message: "You logged out succesfully ",
      success: true,
    });
};

export const register = async (req, res) => {
  try {
    const { fullname, password, email } = req.body;
    if (!fullname || !password || !email) {
      return res.status(401).json({
        message: "please fill data",
        success: false,
      });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(401).json({
        message: "email is already register ",
        success: false,
      });
    }

    const hashpassword = await bcryptjs.hash(password, 10);

    await User.create({
      fullname,
      password: hashpassword,
      email,
    });
    res.status(201).json({
      message: "user is successfully created",
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
