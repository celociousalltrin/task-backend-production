const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to %s", process.env.DATABASE_URI);
    console.log("App is running ... \n");
    console.log("Press CTRL + C to stop the process. \n");
  } catch (err) {
    console.error("App starting error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
