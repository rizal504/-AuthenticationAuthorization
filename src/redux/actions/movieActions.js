import axios from "axios";
import {
  setAllMovie,
  setMoviePopuler,
  setSegeraTayang,
  setTvSeries,
  setDetailMovie,
  setDetailTvSeries,
} from "../reducers/movieReducers";

const API_KEY = "c031317917e2399db20c8146bfb4fa9d";

export const getAllMovies = () => async (dispatch, getState) => {
  //   console.log("getstate", getState());
  try {
    const repsonse = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}`
    );
    // console.log("nowplaying", repsonse)
    dispatch(setAllMovie(repsonse.data.results));
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getMoviePopuler = () => async (dispatch, getState) => {
  console.log("getstatepopuler", getState());
  try {
    const repsonse = await axios.get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`
    );
    //   console.log("popular", repsonse)
    dispatch(setMoviePopuler(repsonse.data.results));
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getSegeraTayang = () => async (dispatch, getState) => {
  // console.log("getstatepopuler", getState());
  try {
    const repsonse = await axios.get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}`
    );
    //   console.log("segera", repsonse)
    dispatch(setSegeraTayang(repsonse.data.results));
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getTvSeries = () => async (dispatch, getState) => {
  console.log("gettv", getState());
  try {
    const repsonse = await axios.get(
      `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}`
    );
    console.log("tvSeries", repsonse);
    dispatch(setTvSeries(repsonse.data.results));
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getDetailMovie = (id) => async (dispatch, getState) => {
  // console.log("getstatepopuler", getState());
  try {
    console.log("id aCtion", id);
    const repsonse = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?language=en-US&api_key=${API_KEY}`
    );
    console.log("segera", repsonse);
    dispatch(setDetailMovie(repsonse.data));
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};

export const getDetailTvSeries = (id) => async (dispatch, getState) => {
  console.log("getstatesereis", getState());
  try {
    console.log("id Series", id);
    const repsonse = await axios.get(
      `https://api.themoviedb.org/3/tv/${id}?language=en-US&api_key=${API_KEY}`
    );
    console.log("seriesssss", repsonse.data);
    dispatch(setDetailTvSeries(repsonse));
  } catch (error) {
    console.log("error", error);
    if (axios.isAxiosError(error)) {
      alert(error.message);
      return;
    }
    alert(error.message);
  }
};
