import Post from "@models/post";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { creator, title, description } = await request.json();

  try {
    await connectToDB();
    const newPost = new Post({
      creator,
      title,
      description,
    });

    await newPost.save();
    return new Response(JSON.stringify(newPost), { status: 201 });
  } catch (error) {
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
