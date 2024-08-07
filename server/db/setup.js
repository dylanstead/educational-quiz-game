const fs = require("fs");
require("dotenv").config();

const db = require("./connect");

const sql = fs.readFileSync("./db/setup.sql");

db.query(sql)
  .then(() => {
    db.end();
    console.log("Setup Complete");
  })
  .catch((error) => console.log(error));
