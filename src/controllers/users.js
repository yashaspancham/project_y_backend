const pool = require("../db");

async function getUserData(req, res) {
    const { user_id } = req.params;
    try {
        const result = await pool.query(
            "SELECT email,username FROM users where id=$1", [user_id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "User is not found" });
        }
        return res.status(200).json({
            message: "User data retrieved successfully",
            user: result.rows[0]
        });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
}

module.exports = { getUserData };