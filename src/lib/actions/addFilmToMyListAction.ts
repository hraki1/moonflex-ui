"use server";

import { cookies } from "next/headers";
import connectToDB from "../dbConnect";
import User from "../models/User";
import { verifyToken } from "../utils/verifyToken";

type Props = {
  filmId: number;
};

export const addToMyListAction = async ({ filmId }: Props) => {
  await connectToDB();

  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    return { message: ["الرجاء تسجيل الدخول أولاً"] };
  }

  const decoded = verifyToken(token);

  if (!decoded || typeof decoded !== "object" || !("id" in decoded)) {
    return { message: ["التوكن غير صالح، يرجى تسجيل الدخول مرة أخرى"] };
  }

  const userId = decoded.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return { message: ["المستخدم غير موجود"] };
    }

    let msg;
    if (user.favoriteFilms.includes(filmId)) {
      user.favoriteFilms.pop(filmId);
      msg = ["تمت إضافة الفيلم إلى قائمتك"];
    } else {
      user.favoriteFilms.push(filmId);
      msg = ["تمت ازالة الفيلم إلى قائمتك"];
    }

    await user.save();

    return { message: msg };
  } catch (error) {
    console.error("Add to list error:", error);
    return { message: ["حدث خطأ أثناء إضافة الفيلم"] };
  }
};
