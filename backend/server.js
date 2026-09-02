require("dotenv").config();

const express = require("express");
const cors = require("cors");

const negotiationRoutes = require("./routes/negotiationRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", negotiationRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "CommercePilot AI Backend Running",
  });
});

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});