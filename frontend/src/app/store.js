import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import goalReducer from '../features/goals/goalSlice';
import moviesReducer from "../features/movie/movieSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    movies: moviesReducer,

  },
  // devTools:true
});

export default store;
