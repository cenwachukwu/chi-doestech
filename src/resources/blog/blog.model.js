const mongoose = require("mongoose");

const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    blogImage: {
      type: String,
      required: true,
      trim: true
    },
    blogCategory: { type: String, required: false, trim: true },
    blogTag: [{ tag: { type: String, required: false, trim: true } }],
    blogPreview: {
      type: String,
      required: true,
      trim: true
    },
    blogBody: [
      {
        postIntroduction: {
          type: String,
          required: true,
          trim: true
        },
        postTerms: [
          {
            term: { type: String, required: false, trim: true },
            note: { type: String, required: false, trim: true }
          }
        ],
        subPost: [
          {
            subPostSubtitle: { type: String, required: true, trim: true },
            subPostText: { type: String, required: false, trim: true },
            subPostImage: { type: String, required: false, trim: true },
            subPostCode: [
              { code: { type: String, required: false, trim: true } }
            ]
          }
        ]
      }
    ],
    dateCreated: { type: String, required: true },
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
