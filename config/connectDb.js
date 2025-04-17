const mongoose = require("mongoose");
const colors = require("colors");
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    mongoose.connection.on("connected", () => {
      console.log("MongoDB connected successfully".bgGreen);
    });

    mongoose.connection.on("error", (error) => {
      console.log("MongoDB connection error".bgRed);
    });
  } catch (error) {
    console.log(`${error}`.bgRed);
  }
};

module.exports = connectDb;
