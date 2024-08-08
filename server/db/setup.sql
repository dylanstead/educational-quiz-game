DROP TABLE IF EXISTS userRegistration;
DROP TABLE IF EXISTS userEntry;
DROP TABLE IF EXISTS userDetail;



CREATE TABLE userDetail ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR (255) NOT NULL,     
    password VARCHAR (25) NOT NULL
);
CREATE TABLE userRegistration ( 
    registration_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES userDetail(id) 
);
CREATE TABLE userScore (
    score_id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    score INTEGER NOT NULL,
    FOREIGN KEY (user_id) REFERENCES userDetail(id)
))