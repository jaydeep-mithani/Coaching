const { validate } = require("../middlewares/validation");
const Coach = require("../models/Coach");
const cloudinary = require("cloudinary").v2;

// Function to create a new coach
exports.createCoach = [
  validate,
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        email,
        about,
        intro,
        availableFrom,
        availableTo,
        availableDays,
        oneToOnePrice,
        groupPrice,
        order,
      } = req.body;

      const folder = "upload";

      const imageUrl = await cloudinary.uploader.upload(req.file.path);

      const coach = new Coach({
        firstName,
        lastName,
        email,
        about,
        intro,
        order,
        availableFrom,
        availableTo,
        availableDays,
        sessionFees: {
          oneToOnePrice,
          groupPrice,
        },
        image: imageUrl.secure_url,
      });

      await coach.save();

      return res
        .status(201)
        .json({ message: "Coach created successfully", coach });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.getCoachList = async (req, res) => {
  try {
    const coaches = await Coach.find().populate("sessions"); // Retrieve all coaches

    return res.status(200).json({ coaches });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.updateCoach = async (req, res) => {
  try {
    const { coachId } = req.params;
    const { sessionFees } = req.body; // Update data in the request body

    // Update the coach record
    const updatedCoach = await Coach.findByIdAndUpdate(
      coachId,
      {
        sessionFees,
      },
      { new: true }
    );

    if (!updatedCoach) {
      return res.status(404).json({ error: "Coach not found" });
    }

    return res
      .status(200)
      .json({ message: "Coach updated successfully", coach: updatedCoach });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Function to delete a coach by ID
exports.deleteCoach = async (req, res) => {
  try {
    const { coachId } = req.params;

    // Delete the coach record
    const deletedCoach = await Coach.findByIdAndRemove(coachId);

    if (!deletedCoach) {
      return res.status(404).json({ error: "Coach not found" });
    }

    return res.status(200).json({ message: "Coach deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCoachById = async (req, res) => {
  try {
    const { coachId } = req.params;

    // Find the coach by their ID
    const coach = await Coach.findById(coachId).populate("sessions");

    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }

    return res.status(200).json({ coach });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getCoachByName = async (req, res) => {
  try {
    const { name } = req.params;

    const coach = await Coach.find({
      firstName: { $regex: new RegExp("^" + name.toLowerCase(), "i") },
    });

    if (!coach) {
      return res.status(404).json({ error: "Coach not found" });
    }

    return res.status(200).json({ coach });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
