import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log(`Server listening on port:${port}`);
});

app.get("/test", (_req, res) => {
    res.json({ test: "This is a test" });
});
