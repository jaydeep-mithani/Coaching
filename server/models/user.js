const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: false,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isFreeReadingBooked: Boolean,
  isVerified: Boolean,
  verificationToken: String,
  resetToken: String,
  purchasedSession: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookedSession",
      required: true,
    },
  ],
  bookedSession: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "BookedSession",
      required: true,
    },
  ],
});

const User = mongoose.model("User", userSchema);

module.exports = User;
