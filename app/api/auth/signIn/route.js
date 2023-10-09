import bcrypt from "bcrypt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { nickname, email, password } = await request.json();

  try {
    await connectToDB();

    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hash = bcrypt.hashSync(password, salt);

    const newUser = new User({
      nickname: nickname,
      email: email,
      password: hash,
    });

    await newUser.save();
    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    return new Response("Failed to create new user", { status: 500 });
  }
};
