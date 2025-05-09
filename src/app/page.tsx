"use client";
import LandingPage from "@/components/landing";
import FilmList from "../components/List";
import Film from "@/models/Film";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Film[]>();

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch popular movies
        const moviesResponse = await fetch(
          "https://api.themoviedb.org/3/movie/popular?api_key=fbd1edacbe4e94f662341a99cd3be594&language=ar&page=1"
        );
        const moviesData = await moviesResponse.json();
        setMovies(moviesData.results);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, []);

  console.log(movies);
  if (!movies) {
    return <p>loading...</p>;
  }

  let array_one: Film[] = [];
  let array_two: Film[] = [];
  let array_three: Film[] = [];
  let array_four: Film[] = [];

  if (movies) {
    array_one = movies.slice(0, 5);
    array_two = movies.slice(5, 10);
    array_three = movies.slice(10, 15);
    array_four = movies.slice(15, 20);
  }

  return (
    <>
      <div>
        <LandingPage />
        <FilmList title="Popular on Netflix" films={array_one} />
        <div className="mt-24">
          <FilmList title="Action" films={array_two} />
        </div>
        <div className="mt-24">
          <FilmList title="Romantic" films={array_three} />
        </div>
        <div className="mt-24">
          <FilmList title="Hard" films={array_four} />
        </div>
       
      </div>
    </>
  );
}
