import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const GET = async (req) => {
  try {
    console.log("Hello");
    await connectToDB();
    const posts = await Post.find({})
      .populate("creator")
      .populate({
        path: "comments",
        populate: { path: "creator" },
      });
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch all posts", { status: 500 });
  }
};
