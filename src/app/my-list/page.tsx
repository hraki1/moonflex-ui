"use client";

import FilmList from "@/components/List";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import Film from "@/models/Film";
import { useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { useEffect, useMemo, useState } from "react";

const TMDB_API_KEY = "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";

const splitArray = (array: Film[], chunkSize: number): Film[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function MyFilmsList() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState<Film[]>([]);
  const usermovieIds = useAppSelector(
    (state: RootState) => state.auth.user?.favoriteFilms
  );

  console.log(movies);

  useEffect(() => {
    const fetchSelectedMovies = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const results = await Promise.all(
          (usermovieIds ?? []).map(async (id) => {
            const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${TMDB_API_KEY}&language=${API_LANGUAGE}`;
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error(`Error fetching movie ${id}: ${response.status}`);
            }
            return response.json();
          })
        );

        setMovies(results);
      } catch (err) {
        console.error("Failed to fetch selected movies:", err);
        setError("Failed to load selected movies. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSelectedMovies();
  }, [usermovieIds]);

  // Memoize categorized movie lists
  const movieLists = useMemo(() => {
    if (!movies.length) return [];
    return splitArray(movies, 5).slice(0, 4); // Get first 4 chunks of 5 movies each
  }, [movies]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)] ">
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
    <div className="p-6 mt-36 text-white space-y-4">
      {movieLists.map((films, index) => (
        <div key={index} className={index > 0 ? "mt-24" : ""}>
          <FilmList films={films} />
        </div>
      ))}
    </div>
  );
}
