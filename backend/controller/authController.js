
const { signUp, loginUser, validateCognitoToken,confirmUser,resendConfirmationCode } = require("../utils/cognito");


exports.resendCode = async (req, res) => {
  const { email } = req.body;

  try {
    const result = await resendConfirmationCode(email);
    res.status(200).json({ message: "Confirmation code resent successfully", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.confirm = async (req, res) => {
  const { email, code } = req.body;

  try {
    const result = await confirmUser(email, code);
    res.status(200).json({ message: "User confirmed successfully", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;
  try {
    const result = await signUp(email, password, firstName, lastName);
    res.status(201).json({ message: "User registered successfully", result });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const tokens = await loginUser(email, password);
    res.status(200).json({ message: "Login successful", tokens });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.validateToken = async (req, res) => {
  const { token } = req.body;
  try {
    const user = await validateCognitoToken(token);
    res.status(200).json({ valid: true, user });
  } catch (err) {
    res.status(400).json({ valid: false, error: err.message });
  }
};
