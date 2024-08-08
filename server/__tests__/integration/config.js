const {Pool} = require("pg");
const fs = require("fs");
require("dotenv").config();

const resetSQL = fs.readFileSync(__dirname + "/reset.sql").toString();

const resetTestDB = async () => {
  const resetSQL = `
    DROP SCHEMA public CASCADE;
    CREATE SCHEMA public;
  `;

  try {
    const db = new Pool({
      connectionString: process.env.DB_URL,
    });
    await db.query(resetSQL);
    await db.end();
    console.log("Test DB reset successfully");
  } catch (err) {
    console.error("Could not reset TestDB:", err);
    throw err;
  }
};

module.exports = {resetTestDB};
