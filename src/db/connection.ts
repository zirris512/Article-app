import pg from "pg";

const pool = new pg.Pool({
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
