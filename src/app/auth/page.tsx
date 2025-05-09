"use client";
import { useState, FormEvent } from "react";
import { NextPage } from "next";

type AuthMode = "login" | "signup";

const AuthPage: NextPage = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (mode === "login") {
        console.log("Login attempt with:", email, password);
        // Add your login logic here
        await new Promise((resolve) => setTimeout(resolve, 1000));
      } else {
        console.log("Signup attempt with:", name, email, password);
        // Add your signup logic here
        await new Promise((resolve) => setTimeout(resolve, 1000));
      }

      // On success, redirect to home page
      // router.push('/');
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : mode === "login"
          ? "Login failed"
          : "Signup failed"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "login" ? "signup" : "login"));
    setError(null);
  };

  return (
    <div className="relative flex h-screen flex-col bg-black md:mt-[120px] md:items-center md:bg-transparent">
      {/* Auth Form */}
      <form
        onSubmit={handleSubmit}
        className="relative mt-24 space-y-6 rounded bg-black/75 py-8 px-6 md:mt-0 md:max-w-md md:px-14"
      >
        <h1 className="text-3xl font-semibold text-white text-center">
          {mode === "login" ? "Login" : "Create Account"}
        </h1>

        {error && (
          <div className="p-3 bg-red-600 text-white rounded text-sm">
            {error}
          </div>
        )}

        <div className="space-y-4">
          {mode === "signup" && (
            <label className="inline-block w-full">
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="input"
                required
              />
            </label>
          )}

          <label className="inline-block w-full">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              required
            />
          </label>

          <label className="inline-block w-full">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              required
              minLength={4}
            />
          </label>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className={`w-full rounded bg-[#e50914] py-3 font-semibold ${
            isLoading ? "opacity-60" : ""
          }`}
        >
          {isLoading
            ? mode === "login"
              ? "Signing In..."
              : "Signing Up..."
            : mode === "login"
            ? "Sign In"
            : "Sign Up"}
        </button>

        <div className="flex justify-between items-center text-[#737373] text-sm">
          <div className="flex items-center">
            <input type="checkbox" id="remember" className="mr-1" />
            <label htmlFor="remember">Remember me</label>
          </div>
          <a href="#" className="hover:underline">
            Need help?
          </a>
        </div>

        <div className="text-[#737373]">
          {mode === "login" ? (
            <>
              New to Netflix?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white hover:underline"
              >
                Sign up now
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={toggleMode}
                className="text-white hover:underline"
              >
                Sign in now
              </button>
            </>
          )}
        </div>

        <div className="text-[#737373] text-xs">
          <p>
            This page is protected by Google reCAPTCHA to ensure you&apos;re not
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
