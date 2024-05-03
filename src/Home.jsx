import React, { useEffect, useState } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Navbar from "./Navbar";
import {
  getAllMovies,
  getMoviePopuler,
  getSegeraTayang,
  getTvSeries,
} from "./redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";
import { setMovieId, setTvId } from "./redux/reducers/movieReducers";

const Home = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Fecth Data Film Sedang Tayang
  const allMovies = useSelector((state) => state.movie.movies);
  useEffect(() => {
    dispatch(getAllMovies());
  }, []);

  // Fecth Data Film Populer
  const moviePopuler = useSelector((state) => state.movie.movies);
  // console.log("moviepop", moviePopuler)
  useEffect(() => {
    dispatch(getMoviePopuler());
  }, []);

  // Fetch Data Segera Tayang
  const segeraTayang = useSelector((state) => state.movie.movies);
  // console.log("movieseg",segeraTayang )
  useEffect(() => {
    dispatch(getSegeraTayang());
  }, []);

  // Fecth Data TV Series
  const tvSeries = useSelector((state) => state?.movie?.tvSeries);
  console.log("tv", tvSeries);
  useEffect(() => {
    dispatch(getTvSeries());
  }, []);

  // slide Acordion Setting
  const settings = {
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  // Logic for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = allMovies.slice(indexOfFirstMovie, indexOfLastMovie);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  //Pengujian token harus ada token
  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container mx-auto bg-black">
      {/* Accordion */}
      <div className="slider-container">
        <Slider {...settings}>
          {currentMovies.map((movie) => (
            <div key={movie.id}>
              <div className="min-h-[720px] relative flex">
                <div className="w-2/3 relative">
                  <img
                    className="absolute -z-20 max-h-[720px] object-cover w-full filter blur-sm"
                    src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                    alt=""
                  />
                  <div className="flex justify-center pt-36 ">
                    <img
                      className="h-[400px] filter shadow-lg shadow-slate-50"
                      src={`https://image.tmdb.org/t/p/w500/${movie?.poster_path}`}
                      alt=""
                    />
                  </div>
                </div>
                <div className="w-1/3 bg-gradient-to-r from-slate-500 via-slate-800  to-black px-6 pt-48 ">
                  <h2 className="text-3xl font-bold mb-2 text-white">
                    {movie.title}
                  </h2>
                  <div className="flex items-center mb-2">
                    <StarIcon className="h-5 w-5 text-yellow-400 mr-1" />
                    <span className="text-white">
                      {movie.vote_average} / 10
                    </span>
                  </div>
                  <p className="text-white mb-4 text-justify py-5">
                    {movie.overview}
                  </p>
                  <button
                    className="bg-[#FFA500] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
                    key={movie.id}
                    onClick={() => {
                      navigate("/movie-details");
                      dispatch(setMovieId(movie?.id));
                    }}
                  >
                    Detail Film
                  </button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
      {/* Navbar */}
      <Navbar />
      {/* Segmen 1 */}
      <div className="pt-20 px-20 ">
        {/* Film Sedang Tayang */}
        <div className="border rounded-3xl shadow-lg shadow-slate-300 bg-slate-100 ">
          <p className="text-5xl font-bold flex justify-center py-10 text-black">
            Film Sedang Tayang
          </p>
          <div className="grid grid-cols-5 gap-5 py-5 px-5">
            {currentMovies.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details");
                  dispatch(setMovieId(movie?.id));
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50">
                  <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                  {movie.vote_average}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl shadow-md object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-10">
                  <h2 className="text-xs font-bold text-center">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-center">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Pagination */}
          <div className="flex justify-center items-center my-5">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="bg-[#FFA500] hover:bg-yellow-400 text-white px-3 py-2 rounded-md mr-2 transition duration-300 transform hover:scale-105"
            >
              Previous
            </button>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentMovies.length < moviesPerPage}
              className="bg-[#FFA500] hover:bg-yellow-400 text-white px-3 py-2 rounded-md mr-2 transition duration-300 transform hover:scale-105"
            >
              Next
            </button>
          </div>
        </div>

        {/* Tombol More */}
      </div>

      {/* Segment 2 */}
      <div className="py-20 px-20 ">
        {/* Film Popular */}
        <div className="border rounded-3xl shadow-lg shadow-slate-300 bg-slate-100">
          <p className="text-5xl font-bold flex justify-center py-10 text-black">
            Film Popular
          </p>
          <div className="grid grid-cols-5 gap-5 py-5 px-5">
            {moviePopuler.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details");
                  dispatch(setMovieId(movie?.id));
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50">
                  <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                  {movie.vote_average}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl shadow-md object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-10">
                  <h2 className="text-xs font-bold text-center">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-center">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Tombol More */}
          <div className="flex justify-center py-5">
            <button
              className="bg-[#FFA500] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              onClick={() => {
                navigate("/movie-Populer");
              }}
            >
              Lihat Lebih
            </button>
          </div>
        </div>
        <div></div>

        {/* Tombol More */}
      </div>

      {/* Segment 3 */}
      <div className="pb-20 px-20 ">
        {/* Film Segera Tayang */}
        <div className="border rounded-3xl shadow-lg shadow-slate-300 bg-slate-100">
          <p className="text-5xl font-bold flex justify-center py-10 text-black">
            Film Segera Tayang
          </p>
          <div className="grid grid-cols-5 gap-5 py-5 px-5">
            {segeraTayang.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details");
                  dispatch(setMovieId(movie?.id));
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50">
                  <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                  {movie.vote_average}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${movie.poster_path}`}
                  alt={movie.title}
                  className="rounded-xl shadow-md object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-10">
                  <h2 className="text-xs font-bold text-center">
                    {movie.title}
                  </h2>
                  <p className="text-sm text-center">{movie.release_date}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Tombol More */}
          <div className="flex justify-center py-5">
            <button
              className="bg-[#FFA500] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              onClick={() => {
                navigate("/segera-tayang");
              }}
            >
              Lihat Lebih
            </button>
          </div>
        </div>
        {/* Tombol More */}
      </div>

      {/* Segment 4 */}
      <div className="py-20 px-20 ">
        {/* TV Series */}
        <div className="border rounded-3xl shadow-lg shadow-slate-300 bg-slate-100">
          <p className="text-5xl font-bold flex justify-center py-10 text-black">
            TV Series
          </p>
          <div className="grid grid-cols-5 gap-5 py-5 px-5">
            {tvSeries.slice(0, 10).map((tv) => (
              <div
                key={tv.id}
                onClick={() => {
                  navigate("/detail-tv");
                  dispatch(setTvId(tv?.id));
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50">
                  <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                  {tv.vote_average}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${tv.poster_path}`}
                  alt={tv.name}
                  className="rounded-xl shadow-md object-cover w-full h-full"
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50 text-white z-10">
                  <h2 className="text-xs font-bold text-center">{tv.name}</h2>
                  <p className="text-sm text-center">{tv.first_air_date}</p>
                </div>
              </div>
            ))}
          </div>
          {/* Tombol More */}
          <div className="flex justify-center py-5">
            <button
              className="bg-[#FFA500] hover:bg-slate-900 text-white font-bold py-2 px-4 rounded transition duration-300 transform hover:scale-105"
              onClick={() => {
                navigate("/tv-series");
              }}
            >
              Lihat Lebih
            </button>
          </div>
        </div>
        {/* Tombol More */}
      </div>
    </div>
  );
};

export default Home;
