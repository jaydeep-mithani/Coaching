const mongoose = require("mongoose");

const paymentDetailSchema = new mongoose.Schema({
  id: {
    type: String,
    unique: true, // Ensure that the ID is unique
    required: true, // Make sure an ID is provided for each payment detail
  },
  //It will raw json that we will receive from stripe webhook. For Audit purpose
  details: {
    type: Object,
    required: true,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session", // Reference to the coach (user) who created the session
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the coach (user) who created the session
    required: false,
  },
});

const PaymentDetail = mongoose.model("PaymentDetails", paymentDetailSchema);

module.exports = PaymentDetail;
