const mongoose = require('mongoose');
require("dotenv").config();

mongoose.set("strictQuery", true);

const connectDB = async () => {
  try {
    const conn=await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${conn.connection.host}`.cyan.undeline);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.red.bold);
    process.exit();
  }
};

module.exports = connectDB;
