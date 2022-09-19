import express from "express";
import expressLayouts from "express-ejs-layouts";
import path from "path";
import url from "url";

import router from "./routes/routes";
import { scraper } from "./scraper/main";

const __dirname = url.fileURLToPath(new URL(".", import.meta.url));
const staticPath = url.fileURLToPath(new URL("..", `${import.meta.url}`));

const app = express();

app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "./views"));

app.use(express.static(path.join(staticPath, "/public")));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", router);

console.log(await scraper());

if (import.meta.env.PROD) {
    app.listen(3000);
}

export const viteNodeApp = app;
