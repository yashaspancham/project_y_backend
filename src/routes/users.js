const express=require("express");
const router=express.Router();
const {getUserName,getLongestStreak }=require("../controllers/users");

router.get("/getUserName/user_id/:user_id",getUserName);
router.get("/getLongestStreak/user_id/:user_id",getLongestStreak);

module.exports=router;