const express = require("express");
const factsController = require("../controllers/factsController");

const router = express.Router();

router.get("/new", factsController.createNewFact);
router.post("/new", factsController.addNewFact);
router.get("/:factDetail", factsController.getFactDetails);
module.exports = router;
