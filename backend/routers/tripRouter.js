const express = require("express");
const router = express.Router();
const { planTrip,getTripsByEmail,uploadItineraryPDF } = require("../controller/tripController");

router.post("/plan-trip", planTrip);
router.post("/upload-itinerary-pdf", uploadItineraryPDF);
router.get("/:email", getTripsByEmail);
module.exports = router;
