const User = require("../models/User");

async function login(req, res) {
  const data = req.body;
  try {
    const user = await User.getUsername(data.username);
    if (!user) {
      throw new Error("Username not found");
    }
    if (user.password === data.password) {
      res.status(200).json({success: true});
    } else {
      throw new Error("Username or password is incorrect");
    }
  } catch (err) {
    res.status(401).json({error: err.message});
  }
}

async function register(req, res) {
  try {
    const data = req.body;
    const result = await User.create(data);
    res.status(201).send(result)
  } catch (err) {
    res.status(400).json({error: err.message});
  }
}

module.exports = {login, register};
