import { API_KEY } from "../utils/Constants";

export const ACCESS_TOKEN = "YOUR_ACCESS_TOKEN";

export const seriesList = [
  "Friends",
  "Hometown Cha-Cha-Cha",
  "Brooklyn Nine-Nine",
  "The Office",
  "The Big Bang Theory",
  "How I Met Your Mother",
  "House of the Dragon",
  "Game of Thrones",
];

export async function fetchTVSeries() {
  const results = await Promise.all(
    seriesList.map(async (name) => {
      try {
        const url = new URL("https://api.themoviedb.org/3/search/tv");
        url.searchParams.set("query", name);
        if (API_KEY) {
          url.searchParams.set("api_key", API_KEY);
        }

        const headers = {
          accept: "application/json",
        };

        if (ACCESS_TOKEN && ACCESS_TOKEN !== "YOUR_ACCESS_TOKEN") {
          headers.Authorization = `Bearer ${ACCESS_TOKEN}`;
        }

        const response = await fetch(url, { headers });

        if (!response.ok) {
          throw new Error(`TMDB error: ${response.status}`);
        }

        const data = await response.json();
        const show = data.results?.[0];

        return show
          ? {
              id: show.id,
              name: show.name,
              overview: show.overview,
              firstAirDate: show.first_air_date,
              rating: show.vote_average,
              backdrop_path: show.backdrop_path,
              poster: show.poster_path
                ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
                : show.backdrop_path
                ? `https://image.tmdb.org/t/p/w780${show.backdrop_path}`
                : null,
            }
          : null;
      } catch (err) {
        console.error(`Error fetching TV series "${name}":`, err);
        return null;
      }
    })
  );

  return results.filter(Boolean);
}

export default {
  ACCESS_TOKEN,
  seriesList,
  fetchTVSeries,
};
