const express=require("express");
const router=express.Router();
const {addEntry, getEntryByID, getEntriesByUser} =require("../controllers/entries");


router.post("/add_entry/:user_id",addEntry);
router.get("/entry/:entry_id",getEntryByID);
router.get("/user/:user_id",getEntriesByUser);


module.exports=router;