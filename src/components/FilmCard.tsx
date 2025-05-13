import React from "react";
import Image from "next/image";
import Film from "@/models/Film";
import Link from "next/link";

interface FilmCardProps {
  film: Film;
  className?: string;
  isTV: boolean;
}

const FilmCard: React.FC<FilmCardProps> = ({ film, isTV, className = "" }) => {
  console.log(isTV);
  return (
    <Link
      href={`/${isTV ? "tv-shows" : "film"}/${film.id}`}
      // onClick={() => onClickHandler("/films/123")}
      className={`film group overflow-hidden flex-none min-w-[180px] md:min-w-[200px] relative transition-all duration-300 hover:z-10 hover:scale-105 ${className}`}
    >
      <div className="rounded-md overflow-hidden shadow-lg relative aspect-[2/3]">
        <Image
          src={
            film.poster_path
              ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
              : "https://via.placeholder.com/500x750?text=No+Poster"
          }
          alt={`Poster of ${film.title ?? film.name}`}
          width={500}
          height={750}
          className="w-full h-full object-cover"
          sizes="(max-width: 768px) 180px, (max-width: 1024px) 200px, 250px"
          priority
        />

        <div
          className="play-button absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 rounded py-3 px-6 transition-all duration-300 opacity-0 group-hover:opacity-100"
          aria-label={`Play ${film.title ?? film.name}`}
        >
          <div className="text-white text-sm font-bold play-arrow"></div>
        </div>
      </div>

      <div className="film-info  absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent p-4 flex flex-col justify-end opacity-100 group-hover:opacity-100 transition-opacity duration-300">
        <h3 className="text-white text-sm font-bold mb-1">
          {(film.release_date ?? film.first_air_date)?.split("-")[0] ?? "N/A"}
        </h3>

        <h3 className="text-white text-lg font-bold line-clamp-2">
          {film.title ?? film.name}
        </h3>
      </div>
    </Link>
  );
};

export default FilmCard;
