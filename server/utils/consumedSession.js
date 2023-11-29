const BookedSession = require("../models/bookedSession");

const consumedSession = async () => {
  try {
    const currentUTCDate = new Date();

    const conditions = {
      $and: [
        { sessionEndDate: { $lt: currentUTCDate.toISOString() } },
        { status: "booked" },
      ],
    };

    const updateFields = {
      $set: { status: "consumed" },
    };
    // const data = await BookedSession.find(conditions);
    await BookedSession.updateMany(conditions, updateFields)
      .then((result) => {
        console.log(`documents updated to "consumed"`);
      })
      .catch((err) => {
        console.error("Error updating consumed documents:", err);
      });
  } catch (error) {
    return error;
  }
};

module.exports = consumedSession;
