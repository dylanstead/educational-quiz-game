DROP TABLE IF EXISTS userRegistration;
DROP TABLE IF EXISTS userEntry;
DROP TABLE IF EXISTS userDetail;



CREATE TABLE userDetail ( 
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    username VARCHAR (255) NOT NULL,     
    password VARCHAR (25) NOT NULL
);
CREATE TABLE userEntry ( 
    content_id INT GENERATED ALWAYS AS IDENTITY,
    date DATE NOT NULL,     
    contents VARCHAR (500),
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES userDetail(id) 
);
CREATE TABLE userRegistration ( 
    registration_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    email VARCHAR(255) NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    id INT NOT NULL,
    FOREIGN KEY (id) REFERENCES userDetail(id) 
);
CREATE TABLE userScore (
    score_id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    id INT NOT NULL,
    score VARCHAR(2) NOT NULL,
    FOREIGN KEY (id) REFERENCES userDetail(id)
)