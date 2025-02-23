import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/user.model.js";

class AuthController {
  static signUp = async (req, res, next) => {
    // const session = await mongoose.startSession();
    // session.startTransaction();

    try {
      const { name, email, password } = req.body;

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        const error = new Error("User already exists");
        error.statusCode = 409;
        throw error;
      }

      //Has passoword ->
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = await User.create(
        [{ name, email, password: hashedPassword }]
        // { session: session }
      );

      // await session.commitTransaction();
      // session.endSession();
      const token = jwt.sign(
        {
          userId: newUser[0]._id,
          email: newUser[0].email,
          name: newUser[0].name,
        },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(201).json({
        success: true,
        message: "User created",
        data: {
          token: token,
          user: newUser[0],
        },
      });
    } catch (err) {
      // await session.abortTransaction();
      // session.endSession();
      console.log(err);
      return res.status(500).json({ msg: err.message });
    }
  };

  signIn = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid credentials" });
      }

      const token = jwt.sign(
        {
          userId: user._id,
        },
        process.env.JWT_SECRET,
        { expiresIn: JWT_EXPIRES_IN }
      );

      res.status(200).json({
        success: true,
        message: "User logged in",
        data: {
          token: token,
          user: user,
        },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: error.message });
    }
  };

  signOut = (req, res, next) => {
    try {
    } catch (error) {}
  };
}

const authController = new AuthController();
authController.signUp = AuthController.signUp;
authController.signIn = AuthController.signIn;
authController.signOut = AuthController.signOut;

export default authController;
