import { Router } from "express";

const authrouter = Router();

authrouter.post("/sign-up", (req, res) => {
  res.send("Signup route");
});
authrouter.post("/sign-in", (req, res) => {
  res.send("Signin route");
});
authrouter.post("/sign-out", (req, res) => {
  res.send("Sigout route");
});



export default authrouter