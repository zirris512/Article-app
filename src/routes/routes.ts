import { Router } from "express";
import { DatabaseError } from "pg";

import { scraper } from "../scraper/main";
import { pool } from "../db/connection";

const router = Router();

router.get("/scrape", async (_req, res) => {
    const data = await pool.query("SELECT * FROM articles");
    if (data.rows.length > 0) {
        return res.send("Data already stored.");
    }
    const scrapedData = await scraper("https://blog.logrocket.com");
    const client = await pool.connect();

    try {
        await client.query("BEGIN");
        for (const article of scrapedData) {
            const { title, description, link } = article;
            await client.query(
                "INSERT INTO articles (title, description, link) VALUES ($1, $2, $3)",
                [title, description, link]
            );
        }
        await client.query("COMMIT");
    } catch (error) {
        await client.query("ROLLBACK");
        if (error instanceof DatabaseError) {
            return res.status(500).send(error.stack);
        }
        return res.send(error);
    } finally {
        client.release();
    }
    return res.send("Data successfuly stored.");
});

export default router;
