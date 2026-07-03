const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth.routes");
const taskRouter = require("./routes/task.routes")
const userRouter = require("./routes/user.routes")
const dashboardRoutes = require("./routes/dashboard.routes");
const cors = require("cors");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://task-manager-jet-tau-67.vercel.app",
      "https://task-manager-git-main-krishnas-projects-c1fe5c17.vercel.app",
    ],
    credentials: true,
  })
);

app.use("/api/auth",authRouter);
app.use("/api/task",taskRouter);
app.use("/api/user",userRouter);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;