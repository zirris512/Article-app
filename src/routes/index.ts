import { Router } from "express";
import scrapeRouter from "./scrape";
import pagesRouter from "./pages";
import apiRouter from "./api"

const router = Router();

router.use("/scrape", scrapeRouter);
router.use("/api", apiRouter)
router.use("/", pagesRouter);

export default router;
