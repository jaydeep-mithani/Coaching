const express = require("express");
const { validateContact, validateEmail } = require("../middlewares/validation");
const contactController = require("../controllers/contactController");
const freeMeditationController = require("../controllers/freeMeditationController");

const router = express.Router();

router.post("/", validateContact, contactController);
router.post("/free-meditation", validateEmail, freeMeditationController);

module.exports = router;
