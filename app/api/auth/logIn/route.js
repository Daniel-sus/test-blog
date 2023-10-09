import bcrypt from "bcrypt";
import User from "@models/user";
import { connectToDB } from "@utils/database";

export const POST = async (request) => {
  const { nickname, email, password } = await request.json();

  try {
    await connectToDB();
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(404).json({ message: "This user does not exist" });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    console.log(isValidPassword, "isValidPassword");

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect login or password" });
    }

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
};
