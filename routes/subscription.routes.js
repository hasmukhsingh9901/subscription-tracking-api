import { Router } from "express";

const subscriptionRouter = Router();

subscriptionRouter.get("/", (req, res) => {
  res.send("Get all subscription");
});
subscriptionRouter.get("/:id", (req, res) => {
  res.send("Get subscription by id");
});

subscriptionRouter.post("/", (req, res) => {
  res.send("Create subscription");
});
subscriptionRouter.put("/:id", (req, res) => {
  res.send("Update subscription");
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send("Delete subscription");
});

subscriptionRouter.get("/user/:id", (req, res) => {
    res.send("Get subscription by user id");
})

subscriptionRouter.put("/user/:id", (req, res) => {
    res.send("Cancel subscription by user id");
})

subscriptionRouter.get("/plan/:id", (req, res) => {
    res.send("Get subscription by plan id");
})

export default subscriptionRouter;
