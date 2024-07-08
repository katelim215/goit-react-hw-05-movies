import axios from 'axios';

const API_KEY = '91e73aa26e4a1e01b8d0f92fd125930e';

axios.defaults.baseURL = 'https://api.themoviedb.org/3/';
axios.defaults.params = {
  api_key: API_KEY,
};

export const fetchTrendingMovies = async () => {
  const response = await axios.get(`trending/movie/day`);
  return response.data.results;
};

export const fetchMovieByQuery = async movieName => {
  const response = await axios.get(`search/movie?query=${movieName}`);
  return response.data.results;
};

export const fetchMovieDetails = async movieId => {
  const response = await axios.get(`movie/${movieId}`);
  return response.data;
};

export const fetchMovieCast = async movieId => {
  const response = await axios.get(`movie/${movieId}/credits?`);
  return response.data.cast;
};

export const fetchMovieReviews = async movieId => {
  const response = await axios.get(`movie/${movieId}/reviews?`);
  return response.data.results;
};

// Generic function to fetch data from the TMDb API
// const fetchData = async (path, params = '') => {
//   const response = await axios.get(`${path}${params}`);
//   return response.data.results || response.data;
// };

// export const fetchTrendingMovies = () => fetchData('trending/movie/day');

// export const fetchMovieByQuery = movieName => fetchData('search/movie', `?query=${movieName}`);

// export const fetchMovieDetails = movieId => fetchData(`movie/${movieId}`);

// export const fetchMovieCast = movieId => fetchData(`movie/${movieId}/credits`).then(data => data.cast);

// export const fetchMovieReviews = movieId => fetchData(`movie/${movieId}/reviews`);
