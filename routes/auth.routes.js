import { Router } from "express";
import authController from "../controllers/auth.controller.js";

const authrouter = Router();

authrouter.post("/sign-up", authController.signUp);
authrouter.post("/sign-in", authController.signIn);
authrouter.post("/sign-out", authController.signOut);

export default authrouter;
