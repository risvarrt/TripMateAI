
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();
const authRouter = require("./routers/authRouter");
const tripRouter = require("./routers/tripRouter");

const app = express();

app.use(cors());
app.use(bodyParser.json());

// API routes
app.use("/auth", authRouter);
app.use("/trips", tripRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
