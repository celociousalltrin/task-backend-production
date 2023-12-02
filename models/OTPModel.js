const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  otp: { type: String, default: null },
  ref_user_email: { type: String, default: null },
  issued_at: { type: Date, default: Date.now },
  expiry_at: { type: Date, default: null },
});

otpSchema.index({ expiry_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model("otp", otpSchema);
