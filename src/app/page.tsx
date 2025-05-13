"use client";

import { useEffect, useState, useMemo } from "react";
import { useAppSelector } from "@/store/hooks";
import Film from "@/models/Film";
import { RootState } from "@/store/store";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import LandingPage from "@/components/landing";
import FilmList from "@/components/List";

// Constants for API configuration
const TMDB_API_KEY = "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";
const API_URL = "https://api.themoviedb.org/3/movie/popular";

// Helper function to split array into chunks
const splitArray = (array: Film[], chunkSize: number): Film[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function HomePage() {
  const [movies, setMovies] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const auth = useAppSelector((state: RootState) => state.auth);

  console.log(auth);

  // Fetch movies data
  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const url = `${API_URL}?api_key=${TMDB_API_KEY}&language=${API_LANGUAGE}&page=1`;
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error("Failed to fetch movies:", err);
        setError("Failed to load movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Memoize categorized movie lists
  const movieLists = useMemo(() => {
    if (!movies.length) return [];
    return splitArray(movies, 5).slice(0, 4); // Get first 4 chunks of 5 movies each
  }, [movies]);

  const listTitles = ["Popular on Netflix", "Action", "Romantic", "Hard"];

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <>
      <LandingPage />
      {movieLists.map((films, index) => (
        <div key={listTitles[index]} className={index > 0 ? "mt-24" : ""}>
          <FilmList title={listTitles[index]} films={films} />
        </div>
      ))}
    </>
  );
}
