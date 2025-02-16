const express = require("express");
const router = express.Router();
const { searchCollection } = require("../controllers/searchCollection.controller.js");

router.get("/search", searchCollection); // Route for searching a collection

module.exports = router;
