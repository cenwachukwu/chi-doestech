// Express is a minimalistic web framework and this basically means you will be building out the functionality that you want
// we are basically routing our requests with express.js

const express = require("express");

// we would also import our controllers too
const userController = require("./user.controllers");

const User = require("./user.model");

//routes to handle requests:
// Our app.use in the index.js forwards a request to our user router.
// route is a path and an HTTP method
// So this route actually handles `/directory` because it's the root route when a request to /directory is forwarded to our router.
const router = express.Router();

const auth = require("../../utils/auth");

// create new user (signup) = post
router.post("/user/signup", userController.signup);

// login user = post
router.post("/user/signin", userController.signin);

// logout
router.post("/user/logout", auth, userController.logout);

// logoutAll
router.post("/user/logoutall", auth, userController.logoutAllDevice);

// find one user = get
router.get("/user", auth, userController.person);

// find multiple users = get
router.get("/users", userController.getAllPersons);

// update user = put
router.put("/user/:id", auth, userController.updatePerson);

// delete user = delete
router.delete("/user/:id", auth, userController.deletePerson);

module.exports = router;
