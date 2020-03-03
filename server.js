const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const port = process.env.PORT;

require("./src/config/connection");

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.listen(port, () => {
  console.log(`REST API on http://localhost:${port}/api`);
});
