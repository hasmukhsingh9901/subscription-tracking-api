import { Router } from "express";
import { getAllUsers, getUser } from "../controllers/user.controller.js";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", authorize, getUser);

// userRouter.post("/", (req, res) => {
//   res.send("Create route");
// });
// userRouter.put("/:id", (req, res) => {
//   res.send("Update route");
// });
// userRouter.delete("/:id", (req, res) => {
//   res.send("Delete route");
// });

export default userRouter;
