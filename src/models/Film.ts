export default interface Film {
  id: number;
  backdrop_path: string;
  overview: string;
  popularity: number;
  poster_path: string;

  // مشتركة جزئياً حسب النوع
  title?: string; // خاص بالفيلم
  name?: string; // خاص بالمسلسل

  release_date?: string; // خاص بالفيلم
  first_air_date?: string; // خاص بالمسلسل

  original_title?: string; // خاص بالفيلم
  original_name?: string; // خاص بالمسلسل

  origin_country?: string[]; // خاص بالمسلسل
  original_language: string;

  genre_ids: number[];
  vote_average: number;
  vote_count: number;
  adult: boolean;
  video?: boolean; // فقط في الأفلام
  episode_run_time?: number[];
}
