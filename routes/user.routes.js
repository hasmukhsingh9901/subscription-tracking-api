import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getUser);
userRouter.post("/", (req, res) => {
  res.send("Create route");
});
userRouter.put("/:id", (req, res) => {
  res.send("Update route");
});
userRouter.delete("/:id", (req, res) => {
  res.send("Delete route");
});

export default userRouter;
