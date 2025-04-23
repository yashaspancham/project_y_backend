const express =require("express");
const app=express();


app.get("/hello",(req,res)=>{
    res.send("Hello, World!");
})

app.listen(7000,()=>{
    console.log("This is the project_y backend");
});