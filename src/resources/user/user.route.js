// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js

const express = require("express");

// we would also import our controllers too
const userController = require("./user.controllers");

//routes to handle requests:
// Our app.use in the index.js forwards a request to our user router.
// route is a path and an HTTP method
// So this route actually handles `/directory` because it's the root route when a request to /directory is forwarded to our router.
const router = express.Router();
