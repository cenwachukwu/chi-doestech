const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const userRouter = require("./src/resources/user/user.route");

const port = process.env.PORT;

require("./src/config/connection");

const app = express();

app.get("/testing", (req, res) => {
  res.send("Hello World");
});

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use(userRouter);

app.listen(port, () => {
  console.log(`REST API on http://localhost:${port}/api`);
});
