const db = require("../db/connect");

class Score {
  constructor({id, score}) {
    this.id = id;
    this.score = score;
  }
  static async sendScore(data) {
    const {id, score} = data;
    try {
      const response = await db.query("INSERT INTO userscore (id, score) VALUES ($1, $2) RETURNING id", [id, score]);
      const newScore = response.rows[0].id
      return new Score({id, score})
    } catch (err) {
      throw new Error(err.message);
    }
  }
}

module.exports = Score;
