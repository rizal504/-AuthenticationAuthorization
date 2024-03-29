import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate, Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_KEY = "c031317917e2399db20c8146bfb4fa9d";

const Home = () => {
  const [dataFilm, setDataFilm] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [dataFilmPopuler, setFilmPopuler] = useState([]);
  const [dataSegeraTayang, setSegeraTayang] = useState([]);
  const [dataTvSeries, setTvSeries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  // Fecth Data Film Sedang Tayang
  useEffect(() => {
    const fetchDataFilm = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&page=1`
        );
        setDataFilm(response.data.results);
      } catch (error) {
        console.error("Error fetching Data movies: ", error);
      }
    };

    fetchDataFilm();
  }, []);

  // Fecth Data Film Populer
  useEffect(() => {
    const fetchMoviePopuler = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setFilmPopuler(response.data.results);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching Data movies: ", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchMoviePopuler();
  }, []);

  // Fetch Data Segera Tayang
  useEffect(() => {
    const fetchSegeraTayang = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
        );
        setSegeraTayang(response.data.results);
        setLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        console.error("Error fetching Data movies: ", error);
        setLoading(false); // Set loading to false even if there's an error
      }
    };

    fetchSegeraTayang();
  }, []);

  // Fecth Data TV Series
  useEffect(() => {
    const fetchTvSeries = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/tv/popular?api_key=${API_KEY}&language=en-US&page=1`
        );
        setTvSeries(response.data.results);
      } catch (error) {
        console.error("Error fetching Data TV series: ", error);
      }
    };

    fetchTvSeries();
  }, []);

  //Fetch Serach Film
  const fetchDataSearch = async () => {
    try {
      if (query.trim().length === 0) return alert("Inputkan Nama Film");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?query=${query}&api_key=${API_KEY}`
      );
      navigate("/hasil-search", {
        state: { searchMovie: response.data.results, searchQuery: query },
      });
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchDataSearch();
  };

  // function navbar Scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const shouldBeScrolled = scrollTop > 0;
      setIsScrolled(shouldBeScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
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
  const currentMovies = dataFilm.slice(indexOfFirstMovie, indexOfLastMovie);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container mx-auto bg-black">
      {/* Accodion */}
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
                      navigate("/movie-details", { state: { id: movie.id } });
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
      <div
        className={`px-5 flex flex-1 justify-between items-center bg-black fixed top-0 left-0 w-full z-10 backdrop-blur-md ${
          isScrolled ? "bg-opacity-80" : "bg-opacity-100"
        }`}
      >
        <div>
          <ul className="flex space-x-4 py-2">
            <li className="px-2 py-2 text-2xl font-medium text-[#FFA500]">
              <Link to={"/"}>MovieKU</Link>
            </li>
            <li className="px-2 py-2 rounded-md text-sm font-medium text-black bg-[#FFA500] flex items-center">
              <Link to={"/"}>Home</Link>
            </li>
            <li className="px-2 py-2 rounded-md text-sm font-medium text-white hover:bg-[#FFA500] hover:text-black flex items-center">
              <Link to={"/movie-populer"}>Popular</Link>
            </li>
            <li className="px-2 py-2 rounded-md text-sm font-medium text-white hover:bg-[#FFA500] hover:text-black flex items-center">
              <Link to={"/segera-tayang"}>Segera Tayang</Link>
            </li>
            <li className="px-2 py-2 rounded-md text-sm font-medium text-white hover:bg-[#FFA500] hover:text-black flex items-center">
              <Link to={"/tv-series"}>TV Series </Link>
            </li>
          </ul>
        </div>
        <div className="bg-gray-800 overflow-hidden rounded-md">
          <form onSubmit={handleSubmit} className="flex">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={handleChange}
              className="border-0 bg-white py-2 pl-5 text-gray-400 placeholder:text-gray-400 focus:bg-gray-100 focus:text-gray-500 focus:ring-0 focus:placeholder:text-gray-500 sm:text-sm sm:leading-6"
            />
            <button className="  bg-[#FFA500] px-5 text-gray-900">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                />
              </svg>
            </button>
          </form>
        </div>
      </div>
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
                  navigate("/movie-details", { state: { id: movie.id } });
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
            {dataFilmPopuler.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie.id } });
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
            {dataSegeraTayang.slice(0, 10).map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie.id } });
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
        <div></div>

        {/* Tombol More */}
      </div>

      {/* Segment 4 */}
      <div className="pb-20 px-20 bg ">
        {/* Film Segera Tayang */}
        <div className="border rounded-3xl shadow-lg shadow-slate-300 bg-slate-100">
          <p className="text-5xl font-bold flex justify-center py-10 text-black">
            TV Series
          </p>
          <div className="grid grid-cols-5 gap-5 py-5 px-5">
            {dataTvSeries.slice(0, 10).map((tv) => (
              <div
                key={tv.id}
                onClick={() => {
                  navigate("/detail-tv", { state: { id: tv.id } });
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105"
              >
                <div className="absolute top-0 right-0 bg-black px-2 py-1 m-2 rounded-lg z-10 text-white bg-opacity-50">
                  <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                  {tv.vote_average}
                </div>
                <img
                  src={`https://image.tmdb.org/t/p/w200/${tv.poster_path}`}
                  alt={tv.title}
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
        <div></div>

        {/* Tombol More */}
      </div>

      {/* <Footer> */}
      <div className=" flex justify-center items-center p-5 bg-black">
        <p className=" text-white text-xl font-semibold">
          All rights reserved ©copyright rizal || 2024
        </p>
      </div>
    </div>
  );
};

export default Home;
