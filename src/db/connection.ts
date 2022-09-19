import { Pool } from "pg";

const pool = new Pool({
    user: import.meta.env.VITE_DB_USER,
    host: "localhost",
    database: "articles",
    password: import.meta.env.VITE_DB_PASSWORD,
});

pool.on("error", (err) => {
    console.error("Unexpected error on idle client", err);
    process.exit(-1);
});

export { pool };
