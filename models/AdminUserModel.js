const mongoose = require("mongoose");

const adminUserSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null, unique: true },
    password: { type: String, default: null },
    phone_number: { type: String, default: null },
  },
  { timestamps: true }
);

module.exports = mongoose.model("adminUser", adminUserSchema);
