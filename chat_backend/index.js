const express = require("express");
const { chats } = require("./data/data");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors= require("colors");
const userRoutes= require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/ErrorMiddleware");
const chatRoutes= require("./routes/chatRoutes");

const app = express();
app.use(express.json());// to accept JSON data 
dotenv.config();
connectDB();

app.use("/api/user",userRoutes);
app.use("/api/chat",chatRoutes);
app.use(notFound);
app.use(errorHandler);

app.get("/", (req, res) => {
  res.send("Api is running");
});

const PORT = process.env.PORT || 8000;
app.listen(PORT, console.log(`connected to port ${8000}`.yellow.bold));
