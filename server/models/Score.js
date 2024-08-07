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

  static async getLatestScore(userId) {
    try {
      const response = await db.query("SELECT score FROM userscore WHERE id = $1 ORDER BY score_id DESC LIMIT 1", [userId])
      if(response.rows.length === 0) {
        throw new Error('No score found for this user')
      }
      return response.rows[0]
    }catch(err) {
      throw new Error(err.message)
    }
  }
}

module.exports = Score;
