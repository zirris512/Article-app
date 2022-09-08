import express from "express";
import { pool } from "../db/connection";

import { PostRequestBody, RequestParams, UpdateRequest } from "../types/routerTypes";

const router = express.Router();

router.get("/articles", async (_req, res) => {
    try {
        const result = await pool.query("SELECT title, description FROM articles");
        res.json(result.rows);
    } catch (error) {
        if (error instanceof Error) {
            res.sendStatus(400).json(error.message);
        }
    }
});

router.post("/article", async (req: PostRequestBody, res) => {
    const { title, description } = req.body;
    try {
        const result = await pool.query(
            "INSERT INTO articles(title, description) VALUES ($1, $2) RETURNING *",
            [title, description]
        );
        res.json(result);
    } catch (error) {
        if (error instanceof Error) {
            res.sendStatus(400).json(error.message);
        }
    }
});

router
    .route("/article/:id")
    .put(async (req: UpdateRequest, res) => {
        const { title, description } = req.body;
        const { id } = req.params;
        let result;
        try {
            if (title && description) {
                result = await pool.query(
                    "UPDATE articles SET title = $1, description = $2 WHERE id = $3 RETURNING *",
                    [title, description, id]
                );
            } else if (title) {
                result = await pool.query(
                    "UPDATE articles SET title = $1 WHERE id = $2 RETURNING *",
                    [title, id]
                );
            } else {
                result = await pool.query(
                    "UPDATE articles SET description = $1 WHERE id = $2 RETURNING *",
                    [description, id]
                );
            }
            res.json(result.rows[0]);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(400).json(error.message);
            }
        }
    })
    .delete(async (req: RequestParams, res) => {
        const { id } = req.params;
        try {
            const result = await pool.query("DELETE FROM articles WHERE id = $1 RETURNING *", [id]);
            res.json(result.rows[0]);
        } catch (error) {
            if (error instanceof Error) {
                res.sendStatus(400).json(error.message);
            }
        }
    });

export default router;
