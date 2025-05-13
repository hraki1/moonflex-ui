// lib/actions/logoutAction.ts
"use server";

import { cookies } from "next/headers";

export const logoutAction = async () => {
  const cookieStore = cookies();
  (await cookieStore).delete("token"); // ✅ يحذف التوكن من الكوكي
};
