const express = require("express");

const blogController = require("./blog.controllers");

const router = express.Router();

const auth = require("../../utils/auth");

// find multiple blogs = get
router.get("/article", blogController.allBlogPosts);

// create new blog = post
router.post("/article", auth, blogController.createBlogPost);

// find one blog by category = get
router.get("/article/:blogCategory", blogController.oneBlogPostByCategory);

router
  .route("/article/:id")

  // find one blog = get
  .get(blogController.oneBlogPostById)

  // update blog= put
  .put(auth, blogController.updateBlogPost)

  // delete blog = delete
  .delete(auth, blogController.deleteBlogPost);

module.exports = router;
