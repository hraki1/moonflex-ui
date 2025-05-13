"use client";

import Image from "next/image";
import { use, useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";

import { Star, Clock, CalendarDays, Play, Plus, Check } from "lucide-react";
import Modal from "@/components/UI/Modal";
import ReactPlayer from "react-player";
import Film from "@/models/Film";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { addToMyListAction } from "@/lib/actions/addFilmToMyListAction";
import { authActions } from "@/store/slices/authSlice";
import { AnimatePresence, motion } from "framer-motion";

export default function FilmDetails({
  params,
}: {
  params: Promise<{ filmId: number }>;
}) {
  const [modalisOpen, setModalIsOpen] = useState(false);
  const { filmId } = use(params);
  console.log(filmId);
  const [trailerKey, setTrailerKey] = useState(null);
  const [movie, setMovie] = useState<Film>();
  const router = useRouter();

  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchData() {
      try {
        const videosResponse = await fetch(
          `https://api.themoviedb.org/3/movie/${filmId}/videos?api_key=fbd1edacbe4e94f662341a99cd3be594`
        );
        const movieDetails = await fetch(
          `https://api.themoviedb.org/3/movie/${filmId}?api_key=fbd1edacbe4e94f662341a99cd3be594`
        );
        const videosData = await videosResponse.json();
        const movieData = await movieDetails.json();
        console.log(videosData);
        console.log(videosData.results[0]?.key);
        setTrailerKey(videosData.results[0]?.key); // Save the video key (e.g., YouTube ID)
        setMovie(movieData); // Save the video key (e.g., YouTube ID)
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    }

    fetchData();
  }, [filmId]);

  async function toggleOpenModal() {
    setModalIsOpen((prev) => !prev);
  }

  async function toggleAddRemoveToMyListHandler() {
    if (!auth.isLoggedIn) {
      return router.push("/auth");
    }

    const res = await addToMyListAction({ filmId });

    if (res?.message?.[0]) {
      toast.success(res.message[0]);
      dispatch(authActions.ToggleAddRemoveItemFromMyList(filmId));
    } else {
      toast.error("فشل في إضافة الفيلم.");
    }
  }

  let isAddedToMyList;

  if (auth.isLoggedIn) {
    isAddedToMyList = auth.user?.favoriteFilms.some((id) => id === filmId);
    console.log(isAddedToMyList);
  }

  console.log(trailerKey);

  // Mock data
  const filmData = {
    title: "The Godfather",
    year: 1972,
    rating: 9.2,
    duration: "2h 55m",
    genres: ["Drama", "Crime"],
    description:
      "Spanning the years 1945 to 1955, a chronicle of the fictional Italian-American Corleone crime family. When organized crime family patriarch, Vito Corleone barely survives an attempt on his life, his youngest son, Michael steps in to take care of the would-be killers, launching a campaign of bloody revenge.",
    director: "Francis Ford Coppola",
    cast: ["Marlon Brando", "Al Pacino", "James Caan", "Robert Duvall"],
    poster: "/images/film1.webp",
    backdrop: "/images/landingPage.jpg",
  };

  if (!movie) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal open={modalisOpen} onClose={toggleOpenModal}>
        <div className="relative w-full bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
          {/* Video Player Container */}
          <div className="relative pt-[56.25%]">
            {/* 16:9 Aspect Ratio */}
            {trailerKey && (
              <div className="absolute inset-0">
                <ReactPlayer
                  url={`https://www.youtube.com/watch?v=${trailerKey}`}
                  width="100%"
                  height="100%"
                  playing={true}
                  controls={true}
                  light={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`} // صورة قبل التشغيل
                  config={{
                    youtube: {
                      playerVars: {
                        origin:
                          typeof window !== "undefined"
                            ? window.location.origin
                            : "",
                        host: "https://www.youtube-nocookie.com",
                        modestbranding: 1,
                        rel: 0,
                        showinfo: 0,
                        fs: 1,
                        autoplay: 1,
                      },
                    },
                  }}
                />
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-2xl font-bold">Movie Trailer</h2>
            </div>

            <p className="text-gray-300 mb-6">
              Watch the official trailer for this movie.
            </p>

            <button
              onClick={toggleOpenModal}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
            >
              Close Trailer
            </button>
          </div>
        </div>
      </Modal>
      <div className="text-white">
        {/* Backdrop with overlay - reduced height on mobile */}
        <div className="relative h-[40vh] sm:h-[50vh] md:h-[70vh] min-h-[300px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
          <div className="relative w-full md:h-[600px] h-[300px]">
            {" "}
            {/* adjust height as needed */}
            <Image
              src={
                movie.backdrop_path
                  ? `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`
                  : "https://via.placeholder.com/500x750?text=No+Poster"
              }
              alt={filmData.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="container mx-auto relative z-20 h-full flex items-end pb-8 sm:pb-12 md:pb-16 px-4 -mt-28 md:-mt-20 md:px-40">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold drop-shadow-2xl text-center md:text-left w-full">
              {movie.title}{" "}
              <span className="text-gray-300">{movie.release_date}</span>
            </h1>
          </div>
        </div>

        {/* Main content - centered and responsive */}
        <div className="container mx-auto px-4 py-6 md:py-8 -mt-36 sm:-mt-32 md:-mt-32 relative z-30 md:px-40">
          <div className="flex flex-col items-center md:items-start md:flex-row gap-6 md:gap-8">
            {/* Poster - smaller on mobile */}
            <div className="w-full max-w-[250px] sm:max-w-[300px] md:w-1/2 lg:w-1/3 flex-shrink-0 group">
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
                      : "https://via.placeholder.com/500x750?text=No+Poster"
                  }
                  alt={filmData.title}
                  width={300}
                  height={450}
                  className="w-full h-auto object-cover"
                  priority
                  placeholder="blur"
                  blurDataURL="/gif/spinner.gif"
                />
              </div>
            </div>

            {/* Details - centered text on mobile */}
            <div className="flex-1 w-full text-center md:text-left">
              {/* Rating and metadata - stacked on mobile */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 sm:gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <Star className="text-yellow-400 w-5 h-5 fill-current" />
                  <span className="text-xl sm:text-2xl font-bold">
                    {filmData.rating}/10
                  </span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <Clock className="w-4 h-4" />
                  <span>{filmData.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <CalendarDays className="w-4 h-4" />
                  <span>{filmData.year}</span>
                </div>
              </div>

              {/* Genres - centered on mobile */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                {filmData.genres.map((genre, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-red-600 rounded-full text-sm"
                  >
                    {genre}
                  </span>
                ))}
              </div>

              {/* Action buttons - centered on mobile */}
              <div className="my-8 sm:mt-10 flex flex-col sm:flex-row justify-center md:justify-start gap-3 sm:gap-4">
                <button
                  onClick={toggleOpenModal}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 hover:bg-red-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Play className="w-4 h-4 sm:w-5 sm:h-5" /> Watch Trailer
                </button>
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  className="px-6 sm:px-8 py-2 sm:py-3 bg-gray-800 hover:bg-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 transition-colors"
                  onClick={toggleAddRemoveToMyListHandler}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    {isAddedToMyList ? (
                      <motion.span
                        key="check"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Check className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="plus"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  <span>My List</span>
                </motion.button>
              </div>

              {/* Description */}
              <p className="text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 max-w-3xl mx-auto md:mx-0">
                {movie.overview}
              </p>

              {/* Director and Cast - stacked on mobile */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    Director
                  </h3>
                  <p>{filmData.director}</p>
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-lg sm:text-xl font-semibold mb-2">
                    Cast
                  </h3>
                  <div className="flex flex-wrap justify-center md:justify-start gap-2">
                    {filmData.cast.map((actor, index) => (
                      <span
                        key={index}
                        className="px-2 sm:px-3 py-1 bg-gray-800 rounded-full text-sm"
                      >
                        {actor}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
