import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send("Fetch All user");
});
userRouter.get("/:id", (req, res) => {
  res.send("Get user by id");
});
userRouter.post("/", (req, res) => {
  res.send("Create route");
});
userRouter.put("/:id", (req, res) => {
  res.send("Update route");
});
userRouter.delete("/:id", (req, res) => {
  res.send("Delete route");
});

export default userRouter
