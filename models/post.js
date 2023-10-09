const { Schema, model, models } = require("mongoose");

const PostSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: [true, "Prompt is required."],
    },
    description: {
      type: String,
      required: [true, "Tag is required."],
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Post = models.Post || model("Post", PostSchema);

export default Post;
