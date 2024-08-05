require("dotenv").config();
const app = require("./app");

const port = process.env.PORT || 3000;

// Correcting the app.listen function to use correct parameters
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

