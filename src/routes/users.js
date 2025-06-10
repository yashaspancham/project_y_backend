const express=require("express");
const router=express.Router();
const {getUserName,getLongestStreak,getTotalEntries }=require("../controllers/users");

router.get("/getUserName/user_id/:user_id",getUserName);
router.get("/getLongestStreak/user_id/:user_id",getLongestStreak);
router.get("/getTotalEntries/user_id/:user_id",getTotalEntries);

module.exports=router;