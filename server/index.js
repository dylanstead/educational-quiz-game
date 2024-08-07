require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

app.get("/config", (req, res) => {
  res.json({
    apiUrl: process.env.BACKEND_URL || `http://${req.hostname}:${port}`,
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});
