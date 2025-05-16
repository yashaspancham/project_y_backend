const express=require("express");
const router =express.Router();
const {authLogin,authSignUp}=require("../controllers/auth");

router.post("/login",authLogin);
router.post("/signup",authSignUp);

module.exports=router;