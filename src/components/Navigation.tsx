"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { ChevronUp, FileUp, Heart, LogOut, User } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { authActions } from "@/store/slices/authSlice";

type Props = {
  user?: {
    name: string;
    email: string;
    favoriteFilms: number[];
  };
};

export default function Navigation({ user }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const auth = useAppSelector((state: RootState) => state.auth);
  const dropdownRef = useRef<HTMLUListElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null); // ⬅️ New Ref
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      dispatch(authActions.login({ user }));
    }
  }, [dispatch, user]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target as Node)
      ) {
        setShowProfileCard(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  function toggleProfileCard() {
    setShowProfileCard((prev) => !prev);
  }

  function cardProfileLinksHandler(path: string) {
    router.push(path);
    setShowProfileCard(false);
  }

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? "bg-black" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto  py-3 flex justify-between items-center">
        {/* Left side - Logo and Desktop Links */}
        <div className="flex items-center space-x-4">
          <Link
            href="/"
            className="text-red-600 font-bold text-3xl ml-2 md:ml-2 lg:ml-5"
          >
            MoonFlex
          </Link>
          <div className="hidden md:flex space-x-6">
            {[
              { href: "/", label: "Home" },
              { href: "/tv-shows", label: "TV Shows" },
              { href: "/movies", label: "Movies" },
              { href: "/new-popular", label: "New & Popular" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-gray-300 text-xl font-medium"
              >
                {label}
              </Link>
            ))}
            {auth.isLoggedIn && (
              <Link
                key={"/my-list"}
                href={"/my-list"}
                className="text-white hover:text-gray-300 text-xl font-medium"
              >
                My List
              </Link>
            )}
          </div>
        </div>

        {/* Right side - Search and Profile */}
        <div className="flex items-center space-x-4">
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

          {/* Profile Dropdown */}
          <div className="relative">
            {auth.isLoggedIn ? (
              <button
                ref={buttonRef}
                onClick={toggleProfileCard}
                className="cursor-pointer flex items-center space-x-1"
              >
                <div className="relative px-3 py-1 rounded bg-red-600 text-white flex items-center mr-2 md:mr-2">
                  <span className="flex gap-1 text-lg font-medium items-center">
                    <motion.div
                      animate={{ rotate: showProfileCard ? 360 : 180 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ChevronUp />
                    </motion.div>
                    {auth.user?.name.split(" ")[0]}
                  </span>
                </div>
              </button>
            ) : (
              <Link
                href="/auth?mode=login"
                className="px-3 py-2 rounded bg-red-600 text-white mr-2 lg:mr-5 md:mr-2 text-lg font-medium"
              >
                Login
              </Link>
            )}

            {/* Dropdown */}
            <AnimatePresence>
              {showProfileCard && (
                <motion.ul
                  ref={dropdownRef}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.15 }}
                  className="absolute w-56 top-full mt-3 right-0 bg-[rgba(0,0,0,0.9)] border border-gray-700 shadow-lg z-50"
                >
                  {[
                    {
                      icon: <User size={18} />,
                      label: "PROFILE",
                      onClick: () => cardProfileLinksHandler("/profile"),
                    },
                    {
                      icon: <Heart size={18} />,
                      label: "FAVORITES",
                    },
                    {
                      icon: <FileUp size={18} />,
                      label: "PASSWORD UPDATE",
                    },
                  ].map(({ icon, label, onClick }) => (
                    <motion.li
                      key={label}
                      whileHover={{
                        backgroundColor: "rgba(255,255,255,0.1)",
                      }}
                      onClick={onClick}
                      className="px-4 py-3 flex items-center gap-3 text-sm text-gray-200 cursor-pointer"
                    >
                      <span className="text-gray-400">{icon}</span>
                      <span className="font-medium">{label}</span>
                    </motion.li>
                  ))}
                  <div className="border-t border-gray-700 mx-2" />
                  <motion.li
                    whileHover={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                    }}
                    onClick={() => cardProfileLinksHandler("/logout")}
                    className="px-4 py-3 flex items-center gap-3 text-sm text-gray-200 cursor-pointer"
                  >
                    <span className="text-gray-400">
                      <LogOut size={18} />
                    </span>
                    <span className="font-medium">SIGN OUT</span>
                  </motion.li>
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-black/70 absolute top-16 left-0 right-0 py-4 px-4">
          <div className="flex flex-col space-y-4">
            {[
              { href: "/", label: "Home" },
              { href: "/tv-shows", label: "TV Shows" },
              { href: "/movies", label: "Movies" },
              { href: "/new-popular", label: "New & Popular" },
            ].map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="text-white hover:text-gray-300 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
            {auth.isLoggedIn && (
              <Link
                href={"/my-list"}
                className="text-white hover:text-gray-300 text-lg"
                onClick={() => setMobileMenuOpen(false)}
              >
                My List
              </Link>
            )}
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
