import { Router } from "express";
import scrapeRouter from "./scrape";
import pagesRouter from "./pages";

const router = Router();

router.use("/scrape", scrapeRouter);
router.use("/", pagesRouter);

export default router;
