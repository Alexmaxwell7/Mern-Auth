import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieService from "./movieService";
import { startTransition } from "react";

const initialState = {
  movies: [],
  shows: [],
  selectMovieOrShow: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: ''
};

export const fetchAsyncMovies = createAsyncThunk(
  "movies/fetchAsyncMovies",
  async (movieName, thunkAPI) => {
    try {
      return await movieService.getMovies(movieName);

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);

    }
  }
);

export const fetchAsyncSeries = createAsyncThunk(
  "movies/fetchAsyncSeries",
  async (seriesName, thunkAPI) => {
    try {
      return await movieService.getSeries(seriesName);

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);

    }
  }
);

export const fetchAsyncDetail = createAsyncThunk(
  "movies/fetchAsyncMovieOrShowDetail",
  async (id, thunkAPI) => {
    try {
      return await movieService.getDetails(id);

    } catch (error) {
      const message =
        (error.response && error.response.data && error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);

    }
  }
);
const movieSlice = createSlice({
  name: "movies",
  initialState,
  reducers: {
    removeSelectedMovieOrShow: (state) => {
      state.selectMovieOrShow = {};
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAsyncMovies.pending, (state) => {
       startTransition.isLoading = true;
      })
      .addCase(fetchAsyncMovies.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.movies = action.payload;
      })
      .addCase(fetchAsyncMovies.rejected,(state,action)=>{
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(fetchAsyncSeries.pending, (state) => {
        startTransition.isLoading = true;
       })
       .addCase(fetchAsyncSeries.fulfilled,(state,action)=>{
         state.isLoading = false;
         state.isSuccess = true;
         state.shows = action.payload;
       })
       .addCase(fetchAsyncSeries.rejected,(state,action)=>{
         state.isLoading = false;
         state.isError = true;
         state.message = action.payload;
       })
      .addCase(fetchAsyncDetail.fulfilled,(state,action)=>{
        state.isLoading = false;
        state.isSuccess = true;
        state.selectMovieOrShow = action.payload;
      })
  }
});

export const { removeSelectedMovieOrShow } = movieSlice.actions;
export const getAllMovies = (state) => state.movies.movies;
export const getAllShows = (state) => state.movies.shows;
export const getSelectedDetails = (state) => state.movies.selectMovieOrShow;
export default movieSlice.reducer;
