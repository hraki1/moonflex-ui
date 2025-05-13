"use client";

import { useEffect, useMemo, useState } from "react";
import Film from "@/models/Film";
import FilmList from "@/components/List";

const TMDB_API_KEY = "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";
const API_URL = `https://api.themoviedb.org/3/tv/popular?api_key=${TMDB_API_KEY}&language=${API_LANGUAGE}&page=1`;

const splitArray = (array: Film[], chunkSize: number): Film[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function TVShowsPage() {
  const [shows, setShows] = useState<Film[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  console.log(shows);

  useEffect(() => {
    const fetchTVShows = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(API_URL);
        if (!response.ok) throw new Error("حدث خطأ أثناء جلب المسلسلات.");
        const data = await response.json();
        setShows(data.results || []);
      } catch (err) {
        console.error(err);
        setError("فشل تحميل المسلسلات. حاول لاحقًا.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchTVShows();
  }, []);

  // Memoize categorized movie lists
  const movieLists = useMemo(() => {
    if (!shows.length) return [];
    return splitArray(shows, 5).slice(0, 4); // Get first 4 chunks of 5 movies each
  }, [shows]);

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-white text-2xl">جاري التحميل...</h1>
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
    "Popular TV Show",
    "Political TV",
    "Sport TV",
    "Drama TV",
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
