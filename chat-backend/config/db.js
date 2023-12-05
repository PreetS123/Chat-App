const mongoose = require("mongoose");

const connectingDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (err) {
    console.log("error in db file", err.message);
    process.exit();
  }
};

module.exports = connectingDB;
