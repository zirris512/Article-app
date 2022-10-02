import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import url from "url";

import router from "./routes";

const staticPath = url.fileURLToPath(new URL("..", `${import.meta.url}`));

const app = express();

app.use(expressLayouts);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");

app.use(express.static(path.join(staticPath, "/public")));
app.set("views", path.join(staticPath, "/public/views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

if (import.meta.env.PROD) {
    app.listen(3000);
}

export const viteNodeApp = app;
