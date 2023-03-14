import axios from 'axios';

// const movieText = "Friends";
// const response = await axios.get(
//   `https://www.omdbapi.com?apiKey=${APIKey}&s=${movieText}&type=movie`
// );
// return response.data;
// }

const APIKey = "542850f7";


const getMovies = async (movieName) => {
  const movieText = "max";
  const response = await axios.get(
    `https://www.omdbapi.com?apiKey=${APIKey}&s=${movieName||movieText}&type=movie`

  );

  return response.data;
};

const getSeries = async (seriesName) => {
  const seriesText = "boys";
  const response = await axios.get(
    `https://www.omdbapi.com?apiKey=${APIKey}&s=${seriesName||seriesText}&type=series`

  );
  return response.data;
};

const getDetails = async (id) => {
  const response = await axios.get(
    `https://www.omdbapi.com?apiKey=${APIKey}&i=${id}&Plot=full`

  );

  return response.data;
};

// export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
//   "movies/fetchAsyncMovieOrShowDetail",
//   async (id) => {
//     const response = await movieAPI.get(`?apiKey=${APIKey}&i=${id}&Plot=full`);
//     return response.data;
//   }
// );



const MovieService = {
  getMovies,
  getSeries,
  getDetails
};

export default MovieService;
