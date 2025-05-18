const pool = require("../db");

async function addEntry(req, res) {
    console.log("here will be entires");
    const { user_id, title, content } = req.body;
    console.log("Adding entry for user:", user_id);
    try {
        await pool.query("INSERT INTO entries (user_id, title, content) VALUES ($1,$2,$3)", [user_id, title, content]);
        console.log("Added entry for user:", user_id);
        return res.status(201).json({ message: "EntryAdded" });
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
        return res.status(200).json({entries:resutl.rows})
    } catch (error) {
        console.error(error)
        return res.status(500).send("server error");
    }
}

module.exports = { addEntry, getEntryByID, getEntriesByUser }