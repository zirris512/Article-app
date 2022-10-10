import { pool } from "./connection";
import { Article, Comment } from "../types";

import { scraper } from "../scraper/main";

export const getArticles = async (): Promise<Article[]> => {
    try {
        const articles = await (await pool.query<Article>("SELECT * FROM articles")).rows;
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

export const getComments = async (id: string): Promise<Comment[]> => {
    try {
        const comments = (
            await pool.query<Comment>(
                "SELECT comment FROM comments AS c INNER JOIN articles ON $1 = c.article_id",
                [id]
            )
        ).rows;
        console.log(comments);
        return comments;
    } catch (error) {
        throw error;
    }
};

export const postComment = async (id: string, comment: string): Promise<Comment[]> => {
    try {
        const insertedData = await (
            await pool.query<Comment>(
                "INSERT INTO comments (comment, article_id) VALUES ($1, $2) RETURNING *",
                [comment, id]
            )
        ).rows;
        return insertedData;
    } catch (error) {
        throw error;
    }
};

export const updateComment = async (id: string, comment: string): Promise<Comment> => {
    try {
        const updatedComment = await (
            await pool.query<Comment>(
                "UPDATE comments SET comment = $1 WHERE id = $2 RETURNING *",
                [comment, id]
            )
        ).rows;
        return updatedComment[0];
    } catch (error) {
        throw error;
    }
};

export const deleteComment = async (id: string): Promise<Comment> => {
    try {
        const deletedComment = await (
            await pool.query<Comment>("DELETE FROM comments WHERE id = $1 RETURNING *", [id])
        ).rows;
        return deletedComment[0];
    } catch (error) {
        throw error;
    }
};
