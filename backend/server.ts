import express from "express";
import routes from "./routes/routes";

const app = express();
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", routes);

if (import.meta.env.PROD) {
    app.listen(port, () => {
        console.log(`Server listening on port:${port}`);
    });
}

export const viteNodeApp = app;
