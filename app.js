import express from "express";
import { PORT } from "./config/env.js";

import userRouter from "./routes/user.routes.js";
import authrouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import morgan from "morgan";
import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";
import cookieParser from "cookie-parser";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

app.use(express());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/v1/auth", authrouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/subscription", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, async () => {
  console.log(`Subscription Tracker API is running on port ${PORT}`);

  await connectToDatabase();
});
