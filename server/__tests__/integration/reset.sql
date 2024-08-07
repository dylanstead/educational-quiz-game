TRUNCATE goats RESTART IDENTITY;

INSERT INTO userDetail (id, username, password) 
VALUES
  (1, 'user 1', '123'),
  (2, 'user 2', '123'),
  (3, 'user 3', '123');