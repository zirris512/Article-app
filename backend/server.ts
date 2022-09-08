import express from "express";

const app = express();
const port = process.env.PORT || 3001;

app.get("/test", (_req, res) => {
    res.json({ test: "This is a test" });
});

if (import.meta.env.PROD) {
    app.listen(port, () => {
        console.log(`Server listening on port:${port}`);
    });
}

export const viteNodeApp = app;
