const express=require("express");
const router=express.Router();
const {addEntry} =require("../controllers/entries");


router.post("/:user_id",addEntry);

module.exports=router;