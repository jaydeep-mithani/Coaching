const User = require("../models/user");

// Function to get a list of all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}, "-password")
      .populate({
        path: "purchasedSession",
        populate: {
          path: "session",
          model: "Session",
        },
      })
      .populate({
        path: "bookedSession",
        populate: {
          path: "session",
          model: "Session",
        },
      }); // Exclude password field from the response

    return res.status(200).json({ users });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getuserById = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId, ["-password", "-resetToken"])
      .populate({
        path: "purchasedSession",
        populate: {
          path: "session",
          model: "Session",
        },
      })
      .populate({
        path: "bookedSession",
        populate: {
          path: "session",
          model: "Session",
        },
      });
    res.status(200).json(user);
  } catch (error) {
    console.log("error : ", error);
    res.status(400).json({ error });
  }
};
