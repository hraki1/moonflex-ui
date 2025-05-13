"use client";

import { useEffect, useMemo, useState } from "react";
import Film from "@/models/Film";
import FilmList from "@/components/List";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const TMDB_API_KEY = "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";
const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${TMDB_API_KEY}&language=${API_LANGUAGE}&page=1`;

const splitArray = (array: Film[], chunkSize: number): Film[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function MoviesPage() {
  const [movies, setMovies] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("حدث خطأ أثناء جلب الأفلام.");
        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        console.error(err);
        setError("فشل تحميل الأفلام. حاول لاحقًا.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, []);

  const movieLists = useMemo(() => {
    if (!movies.length) return [];
    return splitArray(movies, 5).slice(0, 4); // First 4 groups of 5
  }, [movies]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-[calc(100vh-60px)]">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-red-500 text-xl">{error}</h1>
      </div>
    );
  }

  const listTitles = [
    "Popular Movies",
    "Political Movies",
    "Sport Movies",
    "Drama Movies",
  ];

  return (
    <div className="p-6 mt-36 text-white space-y-4">
      {movieLists.map((films, index) => (
        <div key={index} className={index > 0 ? "mt-24" : ""}>
          <FilmList title={listTitles[index]} films={films} />
        </div>
      ))}
    </div>
  );
}
