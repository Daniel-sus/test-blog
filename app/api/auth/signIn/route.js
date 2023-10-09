import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { nickname, email, password } = await request.json();

  try {
    await connectToDB();
    const newUser = new User({
      nickname: nickname,
      email: email,
      password: password,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new user", { status: 500 });
  }
};
