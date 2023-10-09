const { Schema, model, models } = require("mongoose");

const CommentSchema = new Schema(
  {
    creator: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // post: {
    //   type: Schema.Types.ObjectId,
    //   ref: "Post",
    //   required: true,
    // },
    replyToComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
    text: {
      type: String,
      unique: false,
      required: [true, "Comment is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const Comment = models.Comment || model("Comment", CommentSchema);

export default Comment;
