DROP TABLE IF EXISTS userscore CASCADE;
DROP TABLE IF EXISTS userregistration CASCADE;
DROP TABLE IF EXISTS userdetail CASCADE;


CREATE TABLE userdetail (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL
);
CREATE TABLE userregistration (
    id INTEGER PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    FOREIGN KEY (id) REFERENCES userdetail (id) ON DELETE CASCADE
);
CREATE TABLE userscores (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES userdetail (id) ON DELETE CASCADE
);

-- Optionally, insert some initial data
INSERT INTO userdetail (username, password) VALUES ('testuser', 'password');
INSERT INTO userregistration (id, email) VALUES ((SELECT id FROM userdetail WHERE username='testuser'), 'testuser@example.com');
INSERT INTO scores (user_id, score) VALUES ((SELECT id FROM userdetail WHERE username='testuser'), 100);
