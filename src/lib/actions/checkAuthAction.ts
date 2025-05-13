"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import User from "../models/User";
import connectToDB from "../dbConnect";

const JWT_SECRET = process.env.JWT_SECRET as string;

export const checkAuth = async () => {
  try {
    await connectToDB();

    // الطريقة الصحيحة لاستدعاء الكوكيز
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    if (!token) return { user: null };

    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    const user = await User.findById(decoded.id).select("-password");

    const plainUser = {
      name: user.name,
      email: user.email,
    };

    console.log(user);
    return { user: plainUser };
  } catch (error) {
    console.error("Auth check error:", error);
    const cookieStore = cookies();
    (await cookieStore).delete("token");

    return { user: null };
  }
};
