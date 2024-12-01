const express = require("express");
const router = express.Router();
const { planTrip } = require("../controller/tripController");

router.post("/plan-trip", planTrip);

module.exports = router;
