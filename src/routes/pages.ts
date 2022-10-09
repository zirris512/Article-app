import { Router } from "express";
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

export default router;
