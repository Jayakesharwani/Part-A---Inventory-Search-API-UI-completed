const express = require("express");
const router = express.Router();

const { searchInventory } = require("../controllers/searchController");

router.get("/", searchInventory);

module.exports = router;