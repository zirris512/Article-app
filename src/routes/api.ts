import { Router } from "express";

const router = Router();

router.get("/", (_req, res) => {
    res.send("api routes");
});

export default router;
