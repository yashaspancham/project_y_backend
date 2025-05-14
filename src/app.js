const express = require("express");
const pool =require("./db");
const app = express();
const port = 7000;

app.get("/hello", (req, res) => {
  res.send("Hello, World!");
});

app.get("/allusers", async (req, res) => {
  try {
    const result=await pool.query('SELECT * FROM users');
    console.log("result: ",result);
    temp_res={
      user_count:result.rowCount,
      usersArray:result.rows,
    }
    res.json(temp_res);
  } catch (error) {
    console.error(error);
    res.status(500).send("server error");
  }
});

app.listen(7000, () => {
  console.log(
    `This is the project_y backend, runs on http://localhost:${port}`
  );
});
