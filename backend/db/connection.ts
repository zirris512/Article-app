import { Pool } from "pg";

export const pool = new Pool({
    user: "postgres",
    host: "localhost",
    database: "articles",
    password: import.meta.env.VITE_DB_PASSWORD,
});
