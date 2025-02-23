import exp from "constants";
import { Router } from "express";

const workflowRouter = Router();    

workflowRouter.get("/", (req, res) => {
  res.send("Get all workflow");
})

export default workflowRouter;