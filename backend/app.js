const express = require("express");
const app = express();
const dotenv = require("dotenv");
const authRouter = require("./Routes/auth");
const userRouter = require("./Routes/user");
const conversationRouter = require("./Routes/conversations");
const messagesRouter = require("./Routes/message");
const cors = require("cors");
const mongoose = require("mongoose");

// Cors Configuration
app.use(cors());

// Dotenv Configuration
dotenv.config();

// Json Configure
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.DB_URI, {})
  .then(() => {
    console.log("Connected Successfully");
  })
  .catch((err) => {
    console.log(err);
  });

// API's Routes
app.use("/api/user", authRouter);
app.use("/api/get", userRouter);
app.use("/api/conversation", conversationRouter);
app.use("/api/messages", messagesRouter);

// Listining Port
app.listen(process.env.PORT, () => {
  console.log(`server is running on port ${process.env.PORT}`);
});
