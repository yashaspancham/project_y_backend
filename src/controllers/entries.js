const pool = require("../db");

async function addEntry(req, res) {
    console.log("here will be entires");
    const { user_id, title, content } = req.body;
    console.log("Adding entry for user:", user_id);
    try {
        await pool.query("INSERT INTO entries (user_id, title, content) VALUES ($1,$2,$3)", [user_id, title, content]);
        console.log("Added entry for user:", user_id);
        return res.status(201).json({message:"EntryAdded"});
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
}

module.exports = { addEntry };