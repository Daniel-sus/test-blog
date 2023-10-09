import Post from "@models/post";
import Comment from "@models/comment";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { creator, post, text, replyToComment } = await request.json();
  console.log({ creator, post, text, replyToComment });

  try {
    await connectToDB();

    const newCommentData = {
      creator: creator,
      text: text,
    };

    if (replyToComment) {
      newCommentData.replyToComment = replyToComment;
    }

    const newComment = new Comment(newCommentData);

    await newComment.save();

    await Post.findOneAndUpdate(
      {
        _id: post,
      },
      {
        $push: { comments: newComment },
      }
    );

    const populatedComment = await Comment.findById(newComment._id).populate(
      "creator"
    );

    return new Response(JSON.stringify(populatedComment), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new comment", { status: 500 });
  }
};
