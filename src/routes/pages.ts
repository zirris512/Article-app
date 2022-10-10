import { Request, Router } from "express";
import { pool } from "../db/connection";
import { getArticles, scrapeData } from "../db/queries";

const router = Router();

router.get("/", async (_, res) => {
    try {
        let articles = await getArticles();
        if (articles.length == 0) {
            await scrapeData();
            articles = await getArticles();
        }
        res.render("main", { articles });
    } catch (error) {
        res.send(error);
    }
});

router.get("/:id", async (req: Request<{ id: string }>, res) => {
    const { id } = req.params;
    try {
        const comments = await (
            await pool.query<Comment>("SELECT * FROM comments WHERE article_id = $1", [id])
        ).rows;
        res.render("comments", { comments });
    } catch (error) {
        res.send(error);
    }
});

export default router;
