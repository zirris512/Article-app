CREATE TABLE articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    subtitle VARCHAR(255),
    description VARCHAR(255),
    link VARCHAR(255),
);
CREATE TABLE comments (
    id SERIAL PRIMARY KEY,
    comment VARCHAR(255),
    article_id INT REFERENCES articles (id) ON DELETE CASCADE
);