const { Schema, model, models } = require("mongoose");

const UserSchema = new Schema(
  {
    nickname: {
      type: String,
      unique: [true, "Nickname already exists!"],
      required: [true, "Nickname is required!"],
    },
    email: {
      type: String,
      unique: [true, "Email already exists!"],
      required: [true, "Email is required!"],
    },
    password: {
      type: String,
      unique: [true, "Password already exists!"],
      required: [true, "Password is required!"],
    },
  },
  {
    timestamps: true,
  }
);

const User = models.User || model("User", UserSchema);

export default User;
