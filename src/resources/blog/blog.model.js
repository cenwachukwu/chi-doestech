const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    blogBody: {
      type: String,
      required: true,
      trim: true
    },
    dateCreated: {
      type: String,
      required: true
    },
    // this is how you set up relationships in mongo using mongoose
    createdBy: {
      type: mongoose.SchemaTypes.ObjectId,
      // so that mongo knows what model to look for this id
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

blogSchema.index({ user: 1, title: 1 }, { unique: true });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
