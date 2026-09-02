const express = require("express");
const router = express.Router();
const { negotiate } = require("../controllers/negotiationController");

router.post("/negotiate", negotiate);

module.exports = router;