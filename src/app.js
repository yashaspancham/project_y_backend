const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const authLogin = require("./routes/auth");
const entries = require("./routes/entries");
const authenticateToken = require("./middleware/auth");
const UserRoutes=require("./routes/users");

app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  if (req.path === "/auth/login" || req.path === "/auth/signup") return next();
  authenticateToken(req, res, next);
})


app.use("/auth", authLogin);
app.use("/users",UserRoutes);
app.use("/entries", entries);

app.get('/', (req, res) => {
  res.send('Hello from projectyreflections!!!');
});


app.listen(process.env.SERVER_PORT, "0.0.0.0", () => {
  console.log(`Server running at http://localhost: ${process.env.SERVER_PORT}`);
});