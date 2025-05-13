"use server";

import connectToDB from "../dbConnect";
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const JWT_SECRET = process.env.JWT_SECRET as string;

type LoginResult = {
  message: string[];
  user?: {
    name: string;
    email: string;
    password?: string;
    favoriteFilms?: string[];
  };
  success?: boolean;
};

export const loginAction = async (
  prevState: LoginResult,
  formData: FormData
): Promise<LoginResult> => {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const errors: string[] = [];

  // التحقق من صحة المدخلات
  if (!email || !email.includes("@")) errors.push("البريد الإلكتروني غير صالح");
  if (!password || password.length < 6)
    errors.push("كلمة المرور يجب أن تكون 6 أحرف على الأقل");

  if (errors.length > 0) return { message: errors };

  await connectToDB();

  try {
    // البحث عن المستخدم في قاعدة البيانات
    const user = await User.findOne({ email });

    // إذا لم يتم العثور على المستخدم
    if (!user) {
      return { message: ["Email is not used try to create new account"] };
    }

    // مقارنة كلمة المرور مع الهاش المخزن
    const isPasswordValid = await bcrypt.compare(password, user.password);

    // إذا كانت كلمة المرور غير صحيحة
    if (!isPasswordValid) {
      return { message: ["Password not correct"] };
    }

    // إنشاء توكن جديد
    const token = jwt.sign({ id: user._id, email: user.email }, JWT_SECRET, {
      expiresIn: "7d",
    });

    // تخزين التوكن في الكوكيز
    const cookieStore = await cookies();
    cookieStore.set("token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    // إرجاع بيانات المستخدم (بدون كلمة المرور)
    return {
      message: [],
      user: {
        name: user.name,
        email: user.email,
        favoriteFilms: user.favoriteFilms,
      },
      success: true,
    };
  } catch (error) {
    console.error("Login error:", error);
    return { message: ["حدث خطأ أثناء محاولة تسجيل الدخول"] };
  }
};
