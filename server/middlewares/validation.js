const { body, validationResult } = require("express-validator");

const validateRegistration = [
  body("name").trim().notEmpty().withMessage("Username is required"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  // .custom(async (value) => {
  //   const existingUser = await User.findOne({ email: value });
  //   if (existingUser) {
  //     throw new Error('Email already registered');
  //   }
  //   return true;
  // })
  // body("password")
  //   .trim()
  //   .isLength({ min: 8 })
  //   .withMessage("Password must be at least 8 characters")
  //   .matches(/\d/)
  //   .withMessage("Password must contain at least one digit")
  //   .matches(/[A-Z]/)
  //   .withMessage("Password must contain at least one uppercase letter")
  //   .matches(/[a-z]/)
  //   .withMessage("Password must contain at least one lowercase letter")
  //   .matches(/[!@#$%^&*(),.?":{}|<>]/)
  //   .withMessage("Password must contain at least one special character"),
];

const validateLogin = [
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("password").trim().notEmpty().withMessage("Password is required"),
];

const validateEmail = [
  body("email").trim().isEmail().withMessage("Invalid email"),
];

const validatePassword = [
  body("password")
    .trim()
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters")
    .matches(/\d/)
    .withMessage("Password must contain at least one digit")
    .matches(/[A-Z]/)
    .withMessage("Password must contain at least one uppercase letter")
    .matches(/[a-z]/)
    .withMessage("Password must contain at least one lowercase letter")
    .matches(/[!@#$%^&*(),.?":{}|<>]/)
    .withMessage("Password must contain at least one special character"),
];

const validateContact = [
  body("name").trim().notEmpty().withMessage("Username is required"),
  body("contactNo")
    .trim()
    .notEmpty()
    .withMessage("Contact number is required")
    .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/)
    .withMessage("Invalid contact number"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("message").trim().notEmpty().withMessage("Message is required"),
];

const validateCoach = [
  body("firstName").trim().notEmpty().withMessage("firstName is required"),
  body("lastName").trim().notEmpty().withMessage("lastName is required"),
  body("email").trim().isEmail().withMessage("Invalid email"),
  body("intro").trim().notEmpty().withMessage("intro is required"),
];

const validateSessionData = [
  body("coachId").isMongoId().withMessage("Invalid coachId"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("title").isString().notEmpty().withMessage("Title is required"),
  body("details").isString().notEmpty().withMessage("Details are required"),
];

const validateGetSessionDate = [
  body("coachId").isMongoId().withMessage("Invalid coachId"),
  body("date").isISO8601().toDate().withMessage("Invalid date format"),
];

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};

module.exports = {
  validateLogin,
  validateRegistration,
  validateEmail,
  validatePassword,
  validateContact,
  validateSessionData,
  validateCoach,
  validateGetSessionDate,
  validate,
};
