const pool = require("../db");
const redis = require('redis');
const client = redis.createClient();
client.connect(); // For redis v4+

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

        const pattern = `entries:user:${parsedUserId}:page:*`;
        const keys = await client.keys(pattern);
        if (keys.length > 0) {
            await client.del(keys);
        }

        return res.status(201).json({ message: "Entry added" });
    } catch (error) {
        console.error(error);
        return res.status(500).send("Server error");
    }
}


async function getEntryByID(req, res) {
    const { entry_id } = req.params;
    const cacheKey = `entry:id:${entry_id}`;
    try {
        const cached = await client.get(cacheKey);
        if (cached) {
            const parsed = JSON.parse(cached);
            return res.status(200).json(parsed);
        }

        const result = await pool.query("SELECT * FROM entries WHERE id=$1", [entry_id]);
        if (result.rows.length === 0) {
            return res.status(404).json({ message: "Entry not found" });
        }

        const response = { message: "Entry found", entry: result.rows[0] };

        await client.setEx(cacheKey, 3600, JSON.stringify(response));

        return res.status(200).json(response);
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
    const { user_id, page_number } = req.params;
    const cacheKey = `entries:user:${user_id}:page:${page_number}`;
    try {
        if (isNaN(page_number) || parseInt(page_number) < 0) {
            return res.status(400).json({ error: "Invalid page number" });
        }

        const cached = await client.get(cacheKey);
        if (cached) {
            const parsed = JSON.parse(cached);
            return res.status(200).json(parsed);
        }

        const result = await pool.query(`
            SELECT * FROM entries 
            WHERE user_id=$1 
            ORDER BY created_at DESC 
            LIMIT 10 OFFSET $2`, [user_id, parseInt(page_number) * 10]);

        const response = { count: result.rows.length, entries: result.rows };

        await client.setEx(cacheKey, 3600, JSON.stringify(response));

        return res.status(200).json(response);
    } catch (error) {
        console.error(error)
        return res.status(500).send("server error");
    }
}


module.exports = { addEntry, getEntryByID, getEntriesByUser, getEntriesByUserPagination }