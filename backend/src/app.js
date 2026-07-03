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
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth",authRouter);
app.use("/api/task",taskRouter);
app.use("/api/user",userRouter);
app.use("/api/dashboard", dashboardRoutes);
module.exports = app;