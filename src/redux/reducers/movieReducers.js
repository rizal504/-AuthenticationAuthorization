import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
  moviePopuler: [],
  segeraTayang: [],
  tvSeries: [],
  movieId: null,
  tvId: null,
  detailMovie: null,
  detailTvSeries: null,
  // token: localStorage.getItem("token") || null,
};

const movieSlicer = createSlice({
  name: "movie",
  initialState,
  reducers: {
    setAllMovie: (state, action) => {
      state.movies = action.payload;
    },
    setMoviePopuler: (state, action) => {
      //   console.log("action", action);
      state.moviePopuler = action.payload;
    },
    setSegeraTayang: (state, action) => {
      //   console.log("action", action);
      state.segeraTayang = action.payload;
    },
    setTvSeries: (state, action) => {
      // console.log("action", action);
      state.tvSeries = action.payload;
    },
    setMovieId: (state, action) => {
      // console.log("action", action);
      state.movieId = action.payload;
    },
    setDetailMovie: (state, action) => {
      // console.log("action", action);
      state.detailMovie = action.payload;
    },

    setDetailTvSeries: (state, action) => {
      // console.log("action", action);
      state.detailTvSeries = action.payload;
    },

    setTvId: (state, action) => {
      // console.log("action", action);
      state.tvId = action.payload;
    },
  },
});

export const {
  setAllMovie,
  setMoviePopuler,
  setSegeraTayang,
  setTvSeries,
  setMovieId,
  setDetailMovie,
  setDetailTvSeries,
  setTvId,
  setToken,
} = movieSlicer.actions;

export default movieSlicer.reducer;
