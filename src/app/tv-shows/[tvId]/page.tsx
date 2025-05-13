"use client";

import { use, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Toaster, toast } from "react-hot-toast";
import ReactPlayer from "react-player";
import { Star, Clock, CalendarDays, Play, Plus, Check } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

import Modal from "@/components/UI/Modal";
import LoadingSpinner from "@/components/UI/LoadingSpinner";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { RootState } from "@/store/store";
import { authActions } from "@/store/slices/authSlice";
import { addToMyListAction } from "@/lib/actions/addFilmToMyListAction";
import Film from "@/models/Film";

export default function TVDetails({
  params,
}: {
  params: Promise<{ tvId: number }>;
}) {
  const { tvId } = use(params);
  const router = useRouter();

  const [modalisOpen, setModalIsOpen] = useState(false);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [tvShow, setTvShow] = useState<Film>();

  const auth = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function fetchTVDetails() {
      try {
        const [videoRes, detailsRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/tv/${tvId}/videos?api_key=fbd1edacbe4e94f662341a99cd3be594`
          ),
          fetch(
            `https://api.themoviedb.org/3/tv/${tvId}?api_key=fbd1edacbe4e94f662341a99cd3be594`
          ),
        ]);

        const videoData = await videoRes.json();
        const detailsData = await detailsRes.json();

        setTrailerKey(videoData.results[0]?.key || null);
        setTvShow(detailsData);
      } catch (err) {
        console.error("Error loading TV show:", err);
      }
    }

    fetchTVDetails();
  }, [tvId]);

  if (!tvShow) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  const isAddedToMyList = auth.isLoggedIn
    ? auth.user?.favoriteFilms.includes(tvId)
    : false;

  async function toggleModal() {
    setModalIsOpen((prev) => !prev);
  }

  async function toggleMyList() {
    if (!auth.isLoggedIn) return router.push("/auth");

    const res = await addToMyListAction({ filmId: tvId });
    if (res?.message?.[0]) {
      toast.success(res.message[0]);
      dispatch(authActions.ToggleAddRemoveItemFromMyList(tvId));
    } else {
      toast.error("فشل في إضافة المسلسل.");
    }
  }

  return (
    <>
      <Toaster position="top-right" reverseOrder={false} />
      <Modal open={modalisOpen} onClose={toggleModal}>
        {trailerKey && (
          <div className="relative pt-[56.25%] bg-black">
            <div className="absolute inset-0">
              <ReactPlayer
                url={`https://www.youtube.com/watch?v=${trailerKey}`}
                width="100%"
                height="100%"
                playing
                controls
                light={`https://img.youtube.com/vi/${trailerKey}/hqdefault.jpg`}
              />
            </div>
          </div>
        )}
        <div className="p-6 text-white">
          <h2 className="text-2xl font-bold mb-4">TV Show Trailer</h2>
          <button
            onClick={toggleModal}
            className="px-6 py-2 bg-red-600 hover:bg-red-700 rounded-lg"
          >
            Close Trailer
          </button>
        </div>
      </Modal>

      <div className="text-white">
        <div className="relative h-[40vh] md:h-[70vh] w-full">
          <Image
            src={
              tvShow.backdrop_path
                ? `https://image.tmdb.org/t/p/w500${tvShow.backdrop_path}`
                : "/images/fallback-backdrop.jpg"
            }
            alt={tvShow.name || "TV Show Poster"}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
        </div>

        <div className="container mx-auto px-4 py-8 md:px-40 relative -mt-36 md:-mt-32 z-20">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="max-w-[250px] md:w-1/3">
              <Image
                src={
                  tvShow.poster_path
                    ? `https://image.tmdb.org/t/p/w500${tvShow.poster_path}`
                    : "/images/fallback-poster.jpg"
                }
                alt={tvShow.name || "TV Show Poster"}
                width={300}
                height={450}
                className="rounded-xl object-cover"
                priority
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-4xl font-bold mb-2">
                {tvShow.name}{" "}
                <span className="text-gray-400">
                  ({tvShow.first_air_date?.split("-")[0]})
                </span>
              </h1>
              <p className="text-gray-300 text-lg mb-4 max-w-xl mx-auto md:mx-0">
                {tvShow.overview}
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-4">
                <span className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-400" />
                  {tvShow.vote_average?.toFixed(1)}/10
                </span>
                <span className="flex items-center gap-2">
                  <CalendarDays className="w-5 h-5 text-gray-300" />
                  {tvShow.first_air_date}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-gray-300" />
                  {tvShow.episode_run_time?.[0] || 0} min
                </span>
              </div>

              <div className="flex flex-wrap justify-center md:justify-start gap-3">
                <button
                  onClick={toggleModal}
                  className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg flex items-center gap-2"
                >
                  <Play className="w-5 h-5" /> Trailer
                </button>
                <motion.button
                  onClick={toggleMyList}
                  whileTap={{ scale: 0.95 }}
                  className="bg-gray-800 hover:bg-gray-700 px-6 py-2 rounded-lg flex items-center gap-2"
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
                        <Check className="w-5 h-5" />
                      </motion.span>
                    ) : (
                      <motion.span
                        key="plus"
                        initial={{ rotate: 180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: 180, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <Plus className="w-5 h-5" />
                      </motion.span>
                    )}
                  </AnimatePresence>
                  My List
                </motion.button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
