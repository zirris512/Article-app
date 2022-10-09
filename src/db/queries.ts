import { pool } from "./connection";
import type { Articles } from "../types";

import { scraper } from "../scraper/main";

export const getArticles = async (): Promise<Articles[]> => {
    try {
        const articles = await (await pool.query<Articles>("SELECT * FROM articles")).rows;
        return articles;
    } catch (error) {
        throw error;
    }
};

export const scrapeData = async (): Promise<void> => {
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
        throw error;
    } finally {
        client.release();
    }
};
