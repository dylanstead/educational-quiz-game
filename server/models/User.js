const db = require("../db/connect");

class User {
  constructor({username, email, password}) {
    this.username = username;
    this.email = email;
    this.password = password;
  }
  static async getUsername(username) {
    const response = await db.query("SELECT * FROM userDetail WHERE LOWER(username)=LOWER($1);", [username]);
    if (response.rows.lenght != 1) {
      throw new Error("Unable to locate user");
    }
    return new User(response.rows[0]);
  }
  static async create(data) {
    const {username, email, password} = data;
    let detailResponse = await db.query("INSERT INTO userDetail (username, email, password) VALUES ($1, $2) RETURNING id", [username, password])
    const newId = detailResponse.rows[0].id
    let registerResponse = await db.query("INSERT INTO userRegistration (email, id) VALUES ($1, $2) RETURNING id;", [email, newId])
    return new User(registerResponse)
  }
}

module.exports = User;
