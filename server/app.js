// const express = require("express");
// const cors = require("cors");

// const logger = require("./logger");
// const userRouter = require("./routers/users");
// const scoreRouter = require("./routers/scores");

// const app = express();
// app.use(express.json());
// app.use(
//   cors({
//     origin: "https://educational-quiz-game-1.onrender.com",
//     credentials: true,
//   })
// );
// app.use(logger);
// app.use("/users", userRouter);
// app.use("/scores", scoreRouter);

// module.exports = app;

const express = require("express");
const cors = require("cors");

const logger = require("./logger");
const userRouter = require("./routers/users");
const scoreRouter = require("./routers/scores");

const app = express();
app.use(express.json());

const isProduction = process.env.NODE_ENV === "production";
const frontendUrl = isProduction
  ? process.env.PROD_FRONTEND_URL
  : process.env.FRONTEND_URL;

app.use(
  cors({
    origin: frontendUrl,
    credentials: true,
  })
);

app.use(logger);
app.use("/users", userRouter);
app.use("/scores", scoreRouter);
<<<<<<< HEAD

const allowedOrigins = ["http://127.0.0.1:5500", "https://educational-quiz-game-1.onrender.com/"];
const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

=======
>>>>>>> development

module.exports = app;
