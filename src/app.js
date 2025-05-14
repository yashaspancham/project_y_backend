const express=require("express");
const app=express();
require("dotenv").config();
const authLogin=require("./routes/auth");

app.use(express.json());
app.use("/",authLogin);

app.listen(process.env.SERVER_PORT,()=>{
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});