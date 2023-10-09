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
    const isValidPassword = password === user.password;

    // const isValidPassword = await bcrypt.compare(
    //   req.body.password,
    //   user._doc.passwordHash
    // );

    if (!isValidPassword) {
      return res.status(400).json({ message: "Incorrect login or password" });
    }

    // const token = jwt.sign({ _id: user._id }, "vlad2121", { expiresIn: "30d" });

    // const { passwordHash, ...userData } = user._doc;

    // res.json({
    //   ...userData,
    //   token,
    // });
    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response("Failed to login", { status: 500 });
  }
};
