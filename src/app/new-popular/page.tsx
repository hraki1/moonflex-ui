"use client";

import { useEffect, useMemo, useState } from "react";
import Film from "@/models/Film";
import FilmList from "@/components/List";
import LoadingSpinner from "@/components/UI/LoadingSpinner";

const API_KEY = "fbd1edacbe4e94f662341a99cd3be594";
const API_LANGUAGE = "ar";

const endpoints = {
  trendingMovies: `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=${API_LANGUAGE}`,
  trendingTV: `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&language=${API_LANGUAGE}`,
  topRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=${API_LANGUAGE}`,
  upcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=${API_LANGUAGE}`,
};

const splitArray = (array: Film[], chunkSize: number): Film[][] => {
  const result = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

export default function NewPopularPage() {
  const [data, setData] = useState<{
    trendingMovies: Film[];
    trendingTV: Film[];
    topRatedMovies: Film[];
    upcomingMovies: Film[];
  }>({
    trendingMovies: [],
    trendingTV: [],
    topRatedMovies: [],
    upcomingMovies: [],
  });

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const responses = await Promise.all(
          Object.values(endpoints).map((url) => fetch(url))
        );

        const dataResults = await Promise.all(
          responses.map((res) => res.json())
        );

        setData({
          trendingMovies: dataResults[0].results || [],
          trendingTV: dataResults[1].results || [],
          topRatedMovies: dataResults[2].results || [],
          upcomingMovies: dataResults[3].results || [],
        });
      } catch (err) {
        console.error(err);
        setError("فشل في تحميل البيانات، الرجاء المحاولة لاحقاً.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchAll();
  }, []);

  const movieChunks = useMemo(
    () => ({
      trendingMovies: splitArray(data.trendingMovies, 5)[0] || [],
      trendingTV: splitArray(data.trendingTV, 5)[0] || [],
      topRatedMovies: splitArray(data.topRatedMovies, 5)[0] || [],
      upcomingMovies: splitArray(data.upcomingMovies, 5)[0] || [],
    }),
    [data]
  );

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

  return (
    <div className="p-6 mt-36 text-white space-y-12">
      <div>
        <FilmList
          title="الأكثر رواجاً (أفلام)"
          films={movieChunks.trendingMovies}
        />
      </div>

      <div className="mt-24">
        <FilmList
          title="الأكثر رواجاً (مسلسلات)"
          films={movieChunks.trendingTV}
          isTV
        />
      </div>
      <div className="mt-24">
        <FilmList
          title="أعلى تقييم (أفلام)"
          films={movieChunks.topRatedMovies}
        />
      </div>
      <div className="mt-24">
        <FilmList title="قريباً (أفلام)" films={movieChunks.upcomingMovies} />
      </div>
    </div>
  );
}
