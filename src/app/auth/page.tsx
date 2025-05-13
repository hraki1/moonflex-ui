"use client";
import { useActionState, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { authActions } from "@/store/slices/authSlice";

import { signupAction } from "@/lib/actions/SignupAction";
import { loginAction } from "@/lib/actions/LoginAction";
import { Eye, EyeOff } from "lucide-react";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const mode = searchParams.get("mode");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const actionForm = mode === "signup" ? signupAction : loginAction;

  const [formState, formAction, isLoading] = useActionState(actionForm, {
    message: [],
    user: {
      name: "",
      email: "",
      password: "",
    },
    success: false,
  });

  useEffect(() => {
    if (formState.success) {
      dispatch(
        authActions.login({
          user: {
            name: formState.user?.name ?? "",
            email: formState.user?.email ?? "",
          },
        })
      );
      router.push("/");
    }
  }, [dispatch, formState, router]);

  function toggleMode() {
    if (mode === "signup") {
      router.push("/auth?mode=login");
    } else {
      router.push("/auth?mode=signup");
    }
  }

  return (
    <div className="relative flex h-screen flex-col bg-black md:mt-[120px] md:items-center md:bg-transparent">
      <form
        action={formAction}
        className="relative mt-24 space-y-6 rounded bg-black/75 py-8 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-3xl font-semibold text-white text-center">
          {mode === "signup" ? "Create Account" : "Sign In"}
        </h1>

        {formState.message && formState.message.length > 0 && (
          <div className="p-3 bg-red-600 text-white rounded text-sm">
            <ul>
              {formState.message.map((ms, index) => (
                <li key={index}>{ms}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="space-y-4">
          {mode === "signup" && (
            <label className="inline-block w-full">
              <input
                name="name"
                type="text"
                placeholder="Name"
                defaultValue={formState.user?.name}
                className="input"
                disabled={isLoading}
              />
            </label>
          )}

          <label className="inline-block w-full">
            <input
              name="email"
              type="email"
              placeholder="Email"
              defaultValue={formState.user?.email}
              className="input"
              required
              disabled={isLoading}
            />
          </label>
          <div className="relative">
            <label className="inline-block w-full">
              <input
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                defaultValue={formState.user?.password}
                className="input"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute inset-y-0 right-3 flex items-center text-gray-800 hover:text-gray-600 focus:outline-none"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </label>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded bg-[#e50914] py-3 font-semibold ${
            isLoading ? "opacity-60 cursor-not-allowed" : ""
          }`}
        >
          {isLoading
            ? mode === "signup"
              ? "Signing Up..."
              : "Signing In..."
            : mode === "signup"
            ? "Sign Up"
            : "Sign In"}
        </button>

        <div className="flex justify-between items-center text-[#737373] text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="mr-1"
              disabled={isLoading}
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div>

        <div className="text-[#737373]">
          {mode === "signup" ? (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white hover:underline"
                disabled={isLoading}
              >
                Sign in now
              </button>
            </>
          ) : (
            <>
              New to Netflix?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white hover:underline"
                disabled={isLoading}
              >
                Create new account?
              </button>
            </>
          )}
        </div>

        <div className="text-[#737373] text-xs">
          <p>
            This page is protected by Google reCAPTCHA to ensure you&#39;re not
            a bot.{" "}
            <a href="#" className="text-blue-500 hover:underline">
              Learn more.
            </a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default AuthPage;
