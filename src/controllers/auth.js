const pool = require("../db");

async function authLogin(req, res) {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res
        .status(401)
        .json({ error: "Invalid email or password", authenticated: false });
    }

    const user = result.rows[0];

    if (user.password !== password) {
      return res
        .status(401)
        .json({ error: "Invalid email or password", authenticated: false });
    }

    return res.status(200).json({
      message: "Login Sucessful",
      user: { id: user.id, email: user.email, username: user.username },
      authenticated: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}

async function authSignUp(req, res) {
  const { email, password } = req.body;
  try {
    const temp_result = await pool.query("SELECT * FROM users WHERE email=$1", [
      email,
    ]);
    if (temp_result.rows.length > 0) {
      return res
        .status(200)
        .json({ message: "User exists", userCreated: false });
    }
    await pool.query(
      "INSERT INTO users (email,username,password) VALUES ($1, $2, $3)",
      [email, email.split("@")[0], password]
    );

    return res
      .status(200)
      .json({ message: "New User Created", userCreated: true });
  } catch (error) {
    console.error(error);
    return res.status(500).send("server error");
  }
}

module.exports = { authLogin, authSignUp };
