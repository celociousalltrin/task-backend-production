const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: { type: String, default: null },
    email: { type: String, default: null, unique: true },
    password: { type: String, default: null },
    phone_number: { type: String, default: null },
    user_image: { type: Object, default: null },
    is_admin_deleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("user", userSchema);
