const { validate } = require("../middlewares/validation");
const Coach = require("../models/Coach");
const BookedSession = require("../models/bookedSession");
const Session = require("../models/session");
const User = require("../models/user");
const axios = require("axios");
const consumedSession = require("../utils/consumedSession");

exports.bookSession = async (req, res) => {
  try {
    const userId = req.params.userId;
    const sessionId = req.params.sessionId;
    const { date, time } = req.body;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const session = await Session.findById(sessionId).populate("coach");
    const coach = session.coach;

    if (!session) {
      return res.status(404).json({ error: "session not found" });
    }

    const inputDate = date;
    const dateObj = new Date(inputDate);
    const dayOfWeek = dateObj.getDay();
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = daysOfWeek[dayOfWeek];

    const coachAvailability = coach.availableDays.find(
      (day) => day === dayName
    );

    const conflictingCoachSession = await BookedSession.findOne({
      date: date,
      time: time,
      session: sessionId,
    });

    const conflictingUserSession = await BookedSession.findOne({
      date: date,
      time: time,
      user: userId,
    });

    if (coachAvailability) {
      if (conflictingCoachSession) {
        return res.status(400).json({
          error: `coach is not availabe on ${date}, ${time}. Please choose another slot`,
        });
      } else if (conflictingUserSession) {
        return res.status(400).json({
          error: `you have alredy booked session on ${date}, ${time}. Please choose another slot`,
        });
      } else {
        const bookedSession = new BookedSession({
          session: sessionId,
          user: userId,
          date: date,
          time: time,
        });

        await bookedSession.save();
        coach.sessions.push(bookedSession);
        user.sessions.push(bookedSession);
        coach.save();
        user.save();
        return res.status(201).json({
          message: "Coaching session appoint successfully",
          bookedSession,
        });
      }
    } else {
      return res.status(400).json({
        error: `coach is not availabe on ${dayName}`,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllSessionsForUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const sessions = await Session.find({ user: userId });

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find().populate("coach");
    return res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.scheduledEventsCalendly = async (req, res) => {
  try {
    const options = {
      method: "GET",
      url: "https://api.calendly.com/scheduled_events",
      params: {
        organization:
          "https://api.calendly.com/organizations/e7cbbbf8-e5bd-4fa3-90fe-30ae3dd4fde1",
      },
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.CALENDLY_TOKEN}`,
      },
    };

    // Example: Fetch upcoming events
    axios
      .request(options)
      .then(function (response) {
        return res.status(200).json(response.data);
      })
      .catch(function (error) {
        return res.status(500).json(error);
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.inviteeCreated = async (req, res) => {
  try {
    const email = req.body.payload.email;
    const bookedSessionId = req?.body?.payload?.tracking?.utm_content;

    const user = await User.findOne({ email }).populate("purchasedSession");
    const bookedSession = await BookedSession.findOne({
      _id: bookedSessionId,
      user: user._id,
    });

    if (!user) {
      res.status(404).json({ error: "User Not Found" });
    }

    if (!bookedSession) {
      res.status(404).json({ error: "Boooked Session Not Found" });
    }
    if (user && bookedSession) {
      await BookedSession.updateOne(
        { _id: bookedSessionId, user: user._id },
        {
          $set: {
            status: "booked",
            bookedDate: req?.body?.created_at,
            sessionStartDate: req?.body?.payload?.scheduled_event?.start_time,
            sessionEndDate: req?.body?.payload?.scheduled_event?.end_time,
            link: req?.body?.payload?.scheduled_event?.location?.join_url,
          },
        },
        { upsert: true }
      );

      const updatedBookedSession = await BookedSession.findOne({
        _id: bookedSessionId,
        user: user._id,
      });

      const session = await Session.findOne({
        _id: updatedBookedSession?.session,
      });

      if (!session) {
        res.status(404).json({ error: "Session Not Found" });
      }

      if (session.sessionType === "freeReading") {
        const filter = {
          $and: [
            { user: user._id },
            { session: { $ne: session._id } },
            { sessionType: "freeReading" },
          ],
        };

        await BookedSession.deleteMany(filter);

        const newData = user.purchasedSession.filter(
          (i) => i.sessionType !== "freeReading"
        );
        user.purchasedSession = newData;
        user.isFreeReadingBooked = true;
      } else {
        const newData = user.purchasedSession.filter((i) => {
          if (i._id.toString() !== bookedSessionId) {
            return i;
          }
        });

        user.purchasedSession = newData;
      }
      user.bookedSession.push(bookedSession);
      await user.save();

      const coach = await Coach.findOne({ _id: session.coach });
      coach.bookedSession.push(bookedSession);
      await coach.save();

      res.status(200).json({ message: "Session Booked Successfully" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSessionById = async (req, res) => {
  try {
    const { sessionId } = req.params;

    const session = await Session.findById(sessionId).populate("coach");

    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.status(200).json({ session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createSessionByCoach = async (req, res) => {
  try {
    const {
      coachId,
      title,
      details,
      sessionType,
      calendlyLink,
      stripePriceId,
    } = req.body;

    const coach = await Coach.findById(coachId);

    const existingSession = await Session.findOne({
      coach: coachId,
      sessionType,
    });

    if (existingSession) {
      return res.status(400).json({
        error: "Session with the same coach, sessionType already exists",
      });
    }

    // Create a new session
    const session = new Session({
      coach: coachId,
      title,
      details,
      sessionType,
      calendlyLink,
      stripePriceId,
    });

    await session.save();
    coach.sessions.push(session);
    await coach.save();

    return res
      .status(201)
      .json({ message: "Coaching session created successfully", session });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
exports.getSessionsByCoachId = async (req, res) => {
  try {
    const { coachId } = req.params;

    const sessions = await Session.find({ coach: coachId }).populate("coach");

    return res.status(200).json({ sessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getBookedFreeSession = async (req, res) => {
  try {
    const { userId } = req.params;
    const sessions = await Session.find({ sessionType: "freeReading" }).populate("coach");

    const bookedSession = await BookedSession.find({user : `${userId}`, session: sessions[0]._id }).populate('session')
    return res.status(200).json({ bookedSession });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllBookedSessions = async (req, res) => {
  try {
    const bookedSessions = await BookedSession.find()
      .populate({
        path: "session",
        populate: {
          path: "coach",
          model: "coaches",
        },
      })
      .populate("user");
    return res.status(200).json({ bookedSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllBookedSessionsById = async (req, res) => {
  try {
    const { bookedId } = req.params;

    const bookedSessions = await BookedSession.findById(bookedId)
      .populate({
        path: "session",
        populate: {
          path: "coach",
          model: "coaches",
        },
      })
      .populate("user");

    if (!bookedSessions) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.status(200).json({ bookedSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getAllBookedSessionsByUserId = async (req, res) => {
  try {
    const { userId } = req.params;

    const bookedSessions = await BookedSession.find({
      user: userId,
      status: "booked",
    }).populate({
      path: "session",
      populate: {
        path: "coach",
        model: "coaches",
      },
    });

    if (!bookedSessions) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.status(200).json({ bookedSessions });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getSessionsByDateAndCoach = [
  validate,
  async (req, res) => {
    try {
      const { date, coachId } = req.body;

      // Find sessions by date and coach ID
      const sessions = await Session.find({ date, coach: coachId });

      return res.status(200).json({ sessions });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.updateSession = [
  async (req, res) => {
    try {
      const { sessionId } = req.params;
      const { stripePrice } = req.body;

      // Find the session by ID
      const session = await Session.findByIdAndUpdate(
        sessionId,
        {
          stripePrice,
        },
        { new: true }
      );

      if (!session) {
        return res.status(404).json({ error: "Session not found" });
      }

      return res
        .status(200)
        .json({ message: "Session updated successfully", session });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
];

exports.deleteSession = async (req, res) => {
  try {
    const { sessionId } = req.params;

    // Find and delete the session by ID
    const deletedSession = await Session.findByIdAndRemove(sessionId);

    if (!deletedSession) {
      return res.status(404).json({ error: "Session not found" });
    }

    return res.status(200).json({ message: "Session deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.testApi = async (req, res) => {
  try {
    const data = await consumedSession();
    res.status(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
