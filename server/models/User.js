const db = require("../db/connect");

class User {
  constructor({username, email, password}) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  static async getUsername(username) {
    try {
      const response = await db.query("SELECT * FROM userdetail WHERE LOWER(username) = LOWER($1);", [username]);
      if (response.rows.length != 1) {
        throw new Error("Unable to locate user");
      }
      return new User(response.rows[0]);
    } catch (err) {
      throw new Error(err.message);
    }
  }
  static async create(data) {
    const {username, email, password} = data;
    try {
      const detailResponse = await db.query("INSERT INTO userdetail (username, password) VALUES ($1, $2) RETURNING id", [username, password]);
      const newId = detailResponse.rows[0].id;
      const registerResponse = await db.query("INSERT INTO userregistration (email, id) VALUES ($1, $2) RETURNING id;", [email, newId]);
      return new User({username, email, password});
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = User;
