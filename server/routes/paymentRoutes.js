const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

// Route to payment
router.post("/", paymentController.paymentSession);
router.post(
  "/stripe/webhook/payment-completed",
  paymentController.paymentCompleted
);

module.exports = router;
