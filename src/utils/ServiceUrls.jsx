import { API_KEY, PRIME_SHOW_ID } from "./Constants";
const TRENDING_MOVIES = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}`;
const TRENDING_TV = `https://api.themoviedb.org/3/trending/tv/week?api_key=${API_KEY}&region=IN`;
const REGIONAL_TE_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=te`;
const REGIONAL_HI_MOVIES = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&with_original_language=hi`;
const GENRE_MOVIE = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}&language=en-US`;
const GENRE_TV = `https://api.themoviedb.org/3/genre/tv/list?api_key=${API_KEY}&language=en-US`;
const PRIME_SHOW = `https://api.themoviedb.org/3/tv/${PRIME_SHOW_ID}?api_key=${API_KEY}&language=en-US`;
const ADULT_LIST = `https://api.themoviedb.org/3/list/6656?api_key=${API_KEY}&language=en-US`;

export {
  TRENDING_MOVIES,
  TRENDING_TV,
  GENRE_MOVIE,
  GENRE_TV,
  REGIONAL_TE_MOVIES,
  REGIONAL_HI_MOVIES,
  PRIME_SHOW,
  ADULT_LIST
};
