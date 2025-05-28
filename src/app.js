const express=require("express");
const cors = require("cors");
const app=express();
require("dotenv").config();
const authLogin=require("./routes/auth");
const entries =require("./routes/entries");

app.use(express.json());
app.use(cors());

app.use("/auth/",authLogin);
app.use("/entries",entries);

app.get('/', (req, res) => {
  res.send('Hello from Express!');
});


app.listen(process.env.SERVER_PORT,"0.0.0.0",()=>{
  console.log(`Server running at http://localhost:${process.env.SERVER_PORT}`);
});