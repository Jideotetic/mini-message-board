const express = require("express");
const factsController = require("../controllers/factsController");

const router = express.Router();

router.get("/", factsController.getRandomFacts);

module.exports = router;
