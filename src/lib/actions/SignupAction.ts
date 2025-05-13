"use server";

import connectToDB from "../dbConnect";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

type CreateUserResult = {
  message: string[];
  user?: {
    name: string;
    email: string;
    password?: string;
  };
  success?: boolean;
};

export const signupAction = async (
  prevState: CreateUserResult,
  formData: FormData
): Promise<CreateUserResult> => {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: string[] = [];

  if (!name || name.trim() === "") errors.push("Name is required");
  if (!email || !email.includes("@")) errors.push("Valid email is required");
  if (!password || password.length < 6)
    errors.push("Password must be at least 6 characters");

  if (errors.length > 0) return { message: errors };

  await connectToDB();

  const existingUser = await User.findOne({ email });
  if (existingUser) return { message: ["Email already in use"] };

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { id: newUser._id, email: newUser.email },
    JWT_SECRET,
    { expiresIn: "7d" }
  );

  // Fixed cookie setting
  const cookieStore = await cookies();
  cookieStore.set("token", token, {
    httpOnly: true,
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  return {
    message: [],
    user: {
      name,
      email,
    },
    success: true,
  };
};
