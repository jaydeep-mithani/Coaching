const mongoose = require("mongoose");

const sessionSchemaObj = {
  coach: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "coaches", // Reference to the coach (user) who created the session
    required: true,
  },
  sessionType: {
    type: String,
    enum: ["group", "oneToOne", "freeReading"],
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  details: {
    type: String,
    required: true,
  },
  calendlyLink: {
    type: String,
    required: true,
  },
  stripePrice: mongoose.Schema.Types.Mixed,
};

const sessionSchema = new mongoose.Schema(sessionSchemaObj);

const Session = mongoose.model("Session", sessionSchema);
module.exports = Session;
