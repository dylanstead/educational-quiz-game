// require("dotenv").config();
// const app = require("./app");

// const port = process.env.PORT || 3000;

// app.get("/config", (req, res) => {
//   res.json({
//     apiUrl: process.env.BACKEND_URL || `http://${req.hostname}:${port}`,
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening on ${port}`);
// });

require("dotenv").config();
const app = require("./app");

const isProduction = process.env.NODE_ENV === "production";

const port = process.env.PROD_PORT || process.env.PORT || 3000;
const backendUrl = isProduction
  ? process.env.PROD_BACKEND_URL
  : process.env.BACKEND_URL;

app.get("/config", (req, res) => {
  res.json({
    apiUrl: backendUrl || `http://${req.hostname}:${port}`,
  });
});

app.listen(port, () => {
  console.log(`Server listening on ${port}`);
});

// require("dotenv").config();
// const app = require("./app");

// const port = process.env.PORT || 3000; // Always use PORT provided by Render, fallback to 3000 for development
// const backendUrl = process.env.PROD_BACKEND_URL;

// app.get("/config", (req, res) => {
//   res.json({
//     apiUrl: backendUrl || `http://${req.hostname}:${port}`,
//   });
// });

// app.listen(port, () => {
//   console.log(`Server listening on ${port}`);
// });
