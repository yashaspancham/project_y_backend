const pool = require("../db");

async function getUserName(req, res) {
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

async function getLongestStreak(req, res) {
    const { user_id } = req.params;
    try {
        const result = await pool.query(
            "SELECT user_id, MIN(entry_date) AS streak_start, MAX(entry_date) AS streak_end, COUNT(*) AS streak_length FROM( SELECT user_id, date(created_at) AS entry_date, date(created_at) - INTERVAL '1 day' * ROW_NUMBER() OVER(PARTITION BY user_id ORDER BY date(created_at)) AS grp FROM entries WHERE user_id = $1  GROUP BY user_id, date(created_at) ) streaks GROUP BY user_id, grp ORDER BY streak_length DESC LIMIT 1",
            [user_id]
        );
        const longestStreak = (result.rows.length === 0) ? 0 : parseInt(result.rows[0].streak_length) || 0;
        return res.status(200).json({
            message: "Longest streak retrieved successfully",
            longestStreak
        });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
}

async function getCurrentStreak(req, res) {
    const { user_id } = req.params;
    try {
        const result = await pool.query(
              `SELECT COUNT(*) AS current_streak
             FROM (
               SELECT date(created_at) AS entry_date
               FROM entries
               WHERE user_id = $1
                 AND date(created_at) <= CURRENT_DATE
               GROUP BY date(created_at)
               ORDER BY entry_date DESC
             ) dates
             WHERE entry_date >= (
               SELECT MAX(date(created_at)) - INTERVAL '1 day' * (ROW_NUMBER() OVER (ORDER BY MAX(date(created_at)) DESC) - 1)
               FROM entries
               WHERE user_id = $1
                 AND date(created_at) <= CURRENT_DATE
               GROUP BY date(created_at)
               LIMIT 1
             )`,
            [user_id]
        );
        const currentStreak = (result.rows.length === 0) ? 0 : parseInt(result.rows[0].current_streak) || 0;
        return res.status(200).json({
            message: "Current streak retrieved successfully",
            currentStreak
        });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
}

async function getTotalEntries(req, res) {
    const { user_id } = req.params;
    try {
        const result = await pool.query(
            "SELECT COUNT(*) AS total_entries FROM entries WHERE user_id = $1",
            [user_id]
        );
        const totalEntries = (result.rows.length === 0) ? 0 : parseInt(result.rows[0].total_entries) || 0;
        return res.status(200).json({
            message: "Total entries retrieved successfully",
            totalEntries
        });
    } catch (error) {
        return res.status(500).json({ message: "server error" });
    }
}


module.exports = { getUserName, getLongestStreak,getTotalEntries,getCurrentStreak };