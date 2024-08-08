const User = require('../models/User');

async function login(req, res) {
  try {
    const { username, password } = req.body;
    const user = await User.getUsername(username);

    if (!user || user.password !== password) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    res.status(200).send(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

async function register(req, res) {
  try {
    const data = req.body;
    const newUser = await User.create(data);
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
}

module.exports = { login, register };
