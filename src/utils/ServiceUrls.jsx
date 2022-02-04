import { API_KEY } from "./Constants";
const TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const TRENDING_TV = `https://api.themoviedb.org/3/trending/tv/day?api_key=${API_KEY}`;
const REGIONAL_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te`;
const GENRE_MOVIE = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const GENRE_TV = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;
const PRIME_SHOW = `https://api.themoviedb.org/3/tv/98177?api_key=${API_KEY}&language=en-US`;
export {
  TRENDING_MOVIES,
  TRENDING_TV,
  GENRE_MOVIE,
  GENRE_TV,
  REGIONAL_MOVIES,
  PRIME_SHOW
};
