
const express = require("express");
const { register, login, validateToken,confirm,resendCode } = require("../controller/authController");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/validate", validateToken);
router.post("/confirm", confirm);
router.post("/resend", resendCode);

module.exports = router;
