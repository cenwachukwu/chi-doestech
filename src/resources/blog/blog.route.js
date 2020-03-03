const express = require("express");

const blogController = require("./blog.controllers");

const router = express.Router();

// find multiple blogs = get
router.get("/article", blogController.allBlogPosts);

// find one blog by category = get
router.get("/article/:category", blogController.oneBlogPostByCategory);

router
  .route("/article/:id")

  // find one blog = get
  .get(blogController.oneBlogPostById)

  // create new blog = post
  .post(blogController.createBlogPost)

  // update blog= put
  .put(blogController.updateBlogPost)

  // delete blog = delete
  .delete(blogController.deleteBlogPost);

module.exports = router;
