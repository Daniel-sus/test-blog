import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req, { params }) => {
  try {
    await connectToDB();

    const post = await Post.find({ _id: params.id })
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator" },
      });
    return new Response(JSON.stringify(post), { status: 200 });
  } catch (error) {
    return new Response("Failed to fetch post", { status: 500 });
  }
};
