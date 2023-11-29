const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { validate } = require("../middlewares/validation");
const crypto = require("crypto");
const CryptoJS = require("crypto-js");
const sendEmail = require("../utils/sendEmail");
const Session = require("../models/session");
const BookedSession = require("../models/bookedSession");
const resetPasswordTemplate = require("../templates/Resetpassword");
const verifyUserTemplate = require("../templates/verifyUser");

const authController = {
  register: [
    validate,
    async (req, res) => {
      try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
          const verificationToken = crypto.randomBytes(20).toString("hex");

          var bytes = CryptoJS.AES.decrypt(
            password,
            process.env.CRYPTO_JS_SECRET
          );
          var originalText = bytes.toString(CryptoJS.enc.Utf8);

          // Hash the password
          const hashedPassword = await bcrypt.hash(originalText, 10);

          const newUser = new User({
            name,
            email: email.toLowerCase(),
            password: hashedPassword,
            isFreeReadingBooked: false,
            isVerified: false,
            verificationToken,
          });

          await newUser.save();
          const verificationLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
          const emailOptions = {
            to: email,
            subject: "Email Verification",
            text: `Click the following link to verify your email: ${verificationLink}`,
            html: verifyUserTemplate({ verificationLink }),
          };

          await sendEmail(emailOptions);

          res.status(201).json({
            message: "Verification email sent.",
            note: "Please check spams if you can't find the mail in inbox.",
          });
        } else {
          res.status(403).json({
            message: "User already exists with this email.",
            note: "Please check spams if you can't find the mail in inbox.",
          });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  ],
  login: [
    validate,
    async (req, res) => {
      try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email.toLowerCase() })
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
        if (!user) {
          return res
            .status(401)
            .json({ message: "Email is not register!! Please Register." });
        } else if (!user.isVerified) {
          return res.status(401).json({
            message:
              "Email verification is panding!! Check your email inbox and complete your Registration.",
            note: "Please check spams if you can't find the mail in inbox.",
          });
        } else {
          var bytes = CryptoJS.AES.decrypt(
            password,
            process.env.CRYPTO_JS_SECRET
          );
          var originalText = bytes.toString(CryptoJS.enc.Utf8);
          const isPasswordValid = await bcrypt.compare(
            originalText,
            user.password
          );
          if (!isPasswordValid) {
            return res.status(401).json({ message: "Invalid credentials" });
          }

          // Successful login
          const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1h",
          });

          // Successful login
          res.status(200).json({ message: "Login successful", user, token });
        }
      } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
      }
    },
  ],
  verify: [
    async (req, res) => {
      const { token } = req.params;

      const user = await User.findOne({ verificationToken: token });

      if (user) {
        user.isVerified = true;
        user.verificationToken = undefined;
        const sessions = await Session.find({ sessionType: "freeReading" });

        const promises = sessions.map(async (session) => {
          const purchasedSession = new BookedSession({
            session: session._id,
            user: user._id,
            purchaseDate: new Date(),
            status: "purchased",
            sessionType: session.sessionType,
          });
          await purchasedSession.save();
          return user.purchasedSession.push(purchasedSession);
        });
        await Promise.all(promises);
        await user.save();
        res.redirect(`${process.env.HOST_URL}?verify=true`);
      } else {
        res.redirect(`${process.env.HOST_URL}?invalid=true`);
      }
    },
  ],
  requestPasswordReset: [
    validate,
    async (req, res) => {
      const { email } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      } else if (user.resetToken) {
        return res.status(403).json({
          message: "Password reset email already sent.",
          note: "Please check spams if you can't find the mail in inbox.",
        });
      }

      // Generate a reset token
      const resetToken = crypto.randomBytes(20).toString("hex");

      // Update user's resetToken in the database
      user.resetToken = resetToken;
      await user.save();

      const emailOptions = {
        to: email,
        subject: "Password Reset Request",
        html: resetPasswordTemplate({ link: resetToken }),
      };

      await sendEmail(emailOptions);

      res.status(200).json({
        message: "Password reset email sent.",
        note: "Please check spams if you can't find the mail in inbox.",
      });
    },
  ],
  resetPassword: [
    async (req, res) => {
      const { token } = req.body;
      const { password } = req.body;

      // Find user by token and reset password
      const user = await User.findOne({ resetToken: token });

      if (!user) {
        return res.status(400).json({ message: "Invalid token" });
      }

      var bytes = CryptoJS.AES.decrypt(password, process.env.CRYPTO_JS_SECRET);
      var originalText = bytes.toString(CryptoJS.enc.Utf8);
      // Hash the password
      const hashedPassword = await bcrypt.hash(originalText, 10);
      user.password = hashedPassword;
      user.resetToken = undefined;
      await user.save();

      res.status(200).json({ message: "Password reset successful" });
    },
  ],
};

module.exports = authController;
