const Blog = require("./blog.model");

module.exports = {
  // get all blog posts
  allBlogPosts: async (req, res) => {
    try {
      const doc = await Blog.find()
        .lean()
        .exec();

      if (!doc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: doc });
    } catch (error) {
      console.error(e);
      res.status(400).end();
    }
  },
  // find one blog post
  oneBlogPost: async (req, res) => {
    try {
      const doc = await Blog.findOne({ _id: req.params.id })
        .lean()
        .exec();

      if (!doc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: doc });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
  // find one blog post by category
  oneBlogPostByCategory: async (req, res) => {
    try {
      const doc = await Blog.findOne({ blogCategory: req.params.blogCategory })
        .lean()
        .exec();

      if (!doc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: doc });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
  // only authenticated user updates blog post
  updateBlogPost: async (req, res) => {
    try {
      const doc = await Blog.create({
        createdBy: req.User._id,
        _id: req.params.id
      });
      res.status(201).json({ data: doc });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
  // only authenticated user creates blog post
  createBlogPost: async (req, res) => {
    try {
      const updatedDoc = await Blog.findOneAndUpdate(
        {
          createdBy: req.User._id,
          _id: req.params.id
        },
        req.body,
        { new: true }
      )
        .lean()
        .exec();

      if (!updatedDoc) {
        return res.status(400).end();
      }

      res.status(200).json({ data: updatedDoc });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  },
  // only authnticated user deletes blog post
  deleteBlogPost: async (req, res) => {
    try {
      await Blog.findOneAndRemove({
        createdBy: req.User._id,
        _id: req.params.id
      });

      return res.status(200).json({ data: "Your note has been deleted" });
    } catch (error) {
      console.error(error);
      res.status(400).end();
    }
  }
};
