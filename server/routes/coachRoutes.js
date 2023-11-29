const express = require("express");
const router = express.Router();
const coachController = require("../controllers/coachController");
const { validateCoach } = require("../middlewares/validation");
const upload = require("../middlewares/imageUpload");

// Route to create a new coach
router.get("/list", coachController.getCoachList);

router.post("/create", upload.single("image"), coachController.createCoach);

router.put("/update/:coachId", validateCoach, coachController.updateCoach);

router.delete("/:coachId", coachController.deleteCoach);

router.get("/:coachId", coachController.getCoachById);
router.get("/name/:name", coachController.getCoachByName);

module.exports = router;
