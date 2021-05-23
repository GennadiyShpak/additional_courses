const API_KEY = 'bb3f2a9bd6a374d8a5257ae7f0ad6ee7';
const BASE_URL = 'https://api.themoviedb.org/3/';
const trendsMovieByWeek = 'trending/movie/week';

const getTrends = async () => {
  try {
    const response = await fetch(
      `${BASE_URL}${trendsMovieByWeek}?api_key=${API_KEY}`,
    );
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log('error', { error });
  }
};

const getInfo = async (id, category) => {
  try {
    const response = await fetch(
      `${BASE_URL}movie/${id}/${category}?api_key=${API_KEY}`,
    );
    const { results } = await response.json();
    return results;
  } catch (error) {
    console.log('error', { error });
  }
};

const movieApi = {
  getTrends,
  getInfo,
};

export default movieApi;
