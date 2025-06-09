const express=require("express");
const router=express.Router();
const {getUserData}=require("../controllers/users");

router.get("/getUserData/user_id/:user_id",getUserData);

module.exports=router;