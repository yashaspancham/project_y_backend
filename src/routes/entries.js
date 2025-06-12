const express = require("express");
const router = express.Router();
const { addEntry, getEntryByID, getEntriesByUser, getEntriesByUserPagination } = require("../controllers/entries");


router.post("/add_entry/:user_id", addEntry);
router.get("/entry/:entry_id", getEntryByID);
router.get("/user/:user_id", getEntriesByUser);
router.get("/user/user_id/:user_id/page_number/:page_number", getEntriesByUserPagination);

module.exports = router;