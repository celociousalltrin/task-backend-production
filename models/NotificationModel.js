const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema(
  {
    user_id: { type: mongoose.Types.ObjectId, default: null },
    is_read: { type: Boolean, default: false },
    is_clear: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("noitification", notificationSchema);
