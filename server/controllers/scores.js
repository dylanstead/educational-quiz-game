const Score = require("../models/Score");

async function addNew(req, res) {
  try {
    const data = req.body;
    const result = await Score.sendScore(data);
    res.status(201).send(result);
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

async function getLatestScore(req, res) {
  try {
    const userId = req.params.id;
    const result = await Score.getLatestScore(userId)
    res.status(200).send(result);
  }catch(err) {
    res.status(400).json({error: err.message})
  }
}


module.exports = {addNew, getLatestScore};
