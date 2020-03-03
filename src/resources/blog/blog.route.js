const express = require("express");

const blogController = require("./blog.controllers");

const router = express.Router();

// create new blog = post
router.post("/");

// find one blog = get
router.get("/:id");

// find multiple blogs = get
router.get("/");

// update user = put
router.put("/:id");

// delete user = delete
router.delete("/:id");

module.exports = router;
