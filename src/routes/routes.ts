import express from "express";

const router = express.Router();

router.get("/", (_req, res) => {
    res.render("main", { tag: "Hello from home route." });
});

export default router;
