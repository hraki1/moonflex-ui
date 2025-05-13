"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Film from "@/models/Film";
import FilmList from "@/components/List";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

// Constants
const API_KEY =
  process.env.NEXT_PUBLIC_TMDB_API_KEY || "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";
const DEBOUNCE_DELAY = 500;

// TMDB API Response Type
interface TMDBResponse {
  page: number;
  results: TMDBItem[];
  total_pages: number;
  total_results: number;
}

interface TMDBItem {
  id: number;
  media_type: "movie" | "tv" | "person";
  poster_path: string | null;
  backdrop_path: string | null;
  title?: string;
  name?: string;
  original_title?: string;
  original_name?: string;
  overview?: string;
  release_date?: string;
  first_air_date?: string;
  vote_average?: number;
  genre_ids?: number[];
  popularity?: number;
  original_language?: string;
  adult?: boolean;
  video?: boolean;
  vote_count?: number;
}

// Custom debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Helper function to split array into chunks
const splitArray = (array: Film[], chunkSize: number): Film[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

// Utility function to convert TMDB item to Film
const mapToFilm = (item: TMDBItem): Film => ({
  id: item.id,
  title: item.title || item.name || "Unknown",
  original_title: item.original_title || item.original_name || "",
  overview: item.overview || "",
  poster_path: item.poster_path || "",
  backdrop_path: item.backdrop_path || "",
  release_date: item.release_date || item.first_air_date || "",
  vote_average: item.vote_average || 0,
  genre_ids: item.genre_ids || [],
  popularity: item.popularity || 0,
  original_language: item.original_language || "en",
  adult: item.adult || false,
  video: item.video || false,
  vote_count: item.vote_count || 0,
});

// Fetch function for React Query
const fetchSearchResults = async (query: string): Promise<Film[]> => {
  if (!query.trim()) return [];

  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?api_key=${API_KEY}&language=${API_LANGUAGE}&query=${encodeURIComponent(
      query
    )}`
  );

  if (!res.ok) {
    throw new Error(`API request failed with status ${res.status}`);
  }

  const data: TMDBResponse = await res.json();

  return (data.results || [])
    .filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.poster_path
    )
    .map(mapToFilm);
};

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, DEBOUNCE_DELAY);

  const {
    data: results = [],
    isLoading,
    error,
    isError,
  } = useQuery({
    queryKey: ["search", debouncedQuery],
    queryFn: () => fetchSearchResults(debouncedQuery),
    enabled: !!debouncedQuery.trim(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Memoize categorized movie lists
  const movieLists = useMemo(() => {
    if (!results.length) return [];
    return splitArray(results, 6).slice(0, 4); // Get first 4 chunks of 5 movies each
  }, [results]);

  return (
    <div className=" min-h-[calc(100vh-60px)] mt-20  px-6 text-white space-y-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-center">
        ابحث عن الأفلام والمسلسلات
      </h1>

      <input
        type="text"
        placeholder="ابحث عن فيلم أو مسلسل..."
        className="w-full p-3 rounded-xl bg-gray-800 text-white placeholder-gray-400 outline-none focus:ring-2 focus:ring-red-500"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        aria-label="Search for movies and TV shows"
      />

      {isLoading && (
        <div className="flex justify-center min-h-[calc(100vh-60px)] items-center py-8">
          <LoadingSpinner />
          <span className="ml-2">جاري البحث...</span>
        </div>
      )}

      {isError && (
        <div className="p-4 bg-red-900/50 rounded-lg">
          <p className="text-red-400">
            {error instanceof Error ? error.message : "حدث خطأ أثناء البحث"}
          </p>
        </div>
      )}

      {!isLoading && results.length > 0 && (
        <>
          <div dir="rtl" className="flex text-2xl mr-4">{`نتائج البحث لـ "${debouncedQuery}"`}</div>
          <div className="mt-24">
            {movieLists.map((films, index) => (
              <div key={index} className={index > 0 ? "mt-24" : ""}>
                <FilmList films={films} />
              </div>
            ))}
          </div>
        </>
      )}

      {!isLoading && debouncedQuery && results.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-400 text-lg">لا توجد نتائج للبحث</p>
          <p className="text-gray-500 text-sm">حاول استخدام كلمات بحث مختلفة</p>
        </div>
      )}
    </div>
  );
}
