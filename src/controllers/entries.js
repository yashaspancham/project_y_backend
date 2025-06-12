const pool = require("../db");

async function addEntry(req, res) {
    const { title, content } = req.body;
    const { user_id } = req.params;

    console.log("Adding entry for user:", user_id);

    const parsedUserId = Number(user_id);
    if (isNaN(parsedUserId)) {
        return res.status(400).json({ error: "Invalid user ID" });
    }

    try {
        await pool.query(
            "INSERT INTO entries (user_id, title, content) VALUES ($1, $2, $3)",
            [parsedUserId, title, content]
        );
        console.log("Added entry for user:", parsedUserId);
        return res.status(201).json({ message: "Entry added" });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
}


async function getEntryByID(req, res) {
    const { entry_id } = req.params;
    try {
        const result = await pool.query("SELECT * FROM entries WHERE id=$1", [entry_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }
        return res.status(200).json({ message: "Entry found", entry: result.rows[0] });
    } catch (error) {
        console.error(error);
        return res.status(500).send("server error");
    };
}

async function getEntriesByUser(req, res) {
    const { user_id } = req.params;
    try {
        const resutl = await pool.query("SELECT * FROM entries WHERE user_id=$1", [user_id]);
        return res.status(200).json({ entries: resutl.rows })
    } catch (error) {
        console.error(error)
        return res.status(500).send("server error");
    }
}

async function getEntriesByUserPagination(req, res) {
    const { user_id,page_number } = req.params;
    try {
        if (isNaN(page_number) || parseInt(page_number) < 0) {
            return res.status(400).json({ error: "Invalid page number" });
        }
        const result = await pool.query(`
            SELECT * FROM entries 
            WHERE user_id=$1 
            ORDER BY created_at DESC 
            LIMIT 10 OFFSET $2`, [user_id, parseInt(page_number) * 10]);
        return res.status(200).json({ count: result.rows.length, entries: result.rows });
    } catch (error) {
        console.error(error)
        return res.status(500).send("server error");
    }
}

module.exports = { addEntry, getEntryByID, getEntriesByUser, getEntriesByUserPagination }