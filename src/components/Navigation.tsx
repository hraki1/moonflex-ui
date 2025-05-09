"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left side - Logo and Desktop Links */}
        <div className="flex items-center space-x-4">
          {/* Netflix Logo */}
          <Link href="/" className="text-red-600 font-bold text-3xl">
            MoonFlex
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="text-white hover:text-gray-300 text-xl">
              Home
            </Link>
            <Link
              href="/tv-shows"
              className="text-white hover:text-gray-300 text-xl font-medium"
            >
              TV Shows
            </Link>
            <Link
              href="/movies"
              className="text-white hover:text-gray-300 text-xl font-medium"
            >
              Movies
            </Link>
            <Link
              href="/new"
              className="text-white hover:text-gray-300 text-xl font-medium"
            >
              New & Popular
            </Link>
            <Link
              href="/my-list"
              className="text-white hover:text-gray-300 text-xl font-medium"
            >
              My List
            </Link>
          </div>
        </div>

        {/* Right side - Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Icon - Hidden on mobile */}
          <button className="hidden md:block text-white hover:text-gray-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white focus:outline-none"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-9 w-9"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>

          {/* Profile */}
          <div className="relative">
            <Link
              href={"/auth"}
              className=" cursor-pointer flex items-center space-x-1"
            >
              <div className="px-3 py-1 rounded bg-red-600 flex items-center justify-center text-white md:mr-5">
                <span className="text-lg font-medium">Login</span>
              </div>
              {/* <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-white hidden md:block"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg> */}
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/70 bg-opacity-90 absolute top-16 left-0 right-0 py-4 px-4">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/tv-shows"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              TV Shows
            </Link>
            <Link
              href="/movies"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              Movies
            </Link>
            <Link
              href="/new-popular"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              New & Popular
            </Link>
            <Link
              href="/my-list"
              className="text-white hover:text-gray-300 text-lg"
              onClick={() => setMobileMenuOpen(false)}
            >
              My List
            </Link>
            <div className="pt-4 border-t border-gray-700">
              <button className="flex items-center space-x-2 text-white hover:text-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>Search</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
