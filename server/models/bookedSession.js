const mongoose = require("mongoose");

const sessionSchemaObj = {
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Session", // Reference to the coach (user) who created the session
    required: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // Reference to the coach (user) who created the session
    required: true,
  },
  link: {
    type: String,
    required: false,
  },
  status: {
    type: String,
    enum: ["purchased", "booked", "consumed"],
    required: true,
  },
  sessionType: {
    type: String,
    enum: ["group", "oneToOne", "freeReading"],
  },
  purchaseDate: {
    type: Number,
    required: true,
  },
  bookedDate: {
    type: String,
    required: false,
  },
  sessionStartDate: {
    type: String,
    required: false,
  },
  sessionEndDate: {
    type: String,
    required: false,
  },
};

const sessionSchema = new mongoose.Schema(sessionSchemaObj);

//TODO: Need to rename it to some appropriate name, like UserSessions
const BookedSession = mongoose.model("BookedSession", sessionSchema);
module.exports = BookedSession;
