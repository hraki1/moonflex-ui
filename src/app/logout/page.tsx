"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/lib/actions/logoutAction";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/authSlice";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

export default function LogoutPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const logout = async () => {
      await logoutAction(); // حذف من السيرفر أو الكوكيز
      dispatch(authActions.logout()); // حذف من Redux
      router.replace("/auth"); // إعادة التوجيه بعد ما كل شيء يُنظف
    };

    logout();
  }, [dispatch, router]);

  return (
    <div className="flex justify-center items-center h-[calc(100vh-60px)] text-white">
      <LoadingSpinner />
    </div>
  );
}
