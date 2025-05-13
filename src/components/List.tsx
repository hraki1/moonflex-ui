"use client";
import { useRef, useState, useEffect } from "react";
import FilmCard from "./FilmCard";
import Film from "@/models/Film";

interface FilmListProps {
  title?: string;
  isTV?: boolean;
  films: Film[];
}

export default function FilmList({ title, isTV, films }: FilmListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const checkScrollPosition = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth);
    }
  };

  useEffect(() => {
    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScrollPosition);
      // Initial check
      checkScrollPosition();
    }
    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScrollPosition);
      }
    };
  }, []);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -500 : 500;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="mb-12 -mt-20 relative group z-20">
      <h2 className="text-xl md:text-2xl font-bold text-white mb-4 px-4 md:px-12">
        {title}
      </h2>

      <div className="relative">
        {/* Left scroll button (appears on hover and when not at start) */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="bg-black/60 px-2 absolute hidden sm:flex left-0 top-0 bottom-0 z-20 w-12 h-full bg-gradient-to-r from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {/* Film list */}
        <div
          ref={scrollRef}
          className="flex overflow-x-auto space-x-2 md:space-x-4 px-4 md:px-12 scrollbar-hide"
          onScroll={checkScrollPosition}
        >
          {films.map((film) => (
            <FilmCard key={film.id} isTV={isTV ?? false} film={film} />
          ))}
        </div>

        {/* Right scroll button (appears on hover and when not at end) */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="bg-black/60 px-2 absolute hidden sm:flex right-0 top-0 bottom-0 z-20 w-12 h-full bg-gradient-to-l from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 items-center justify-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}
