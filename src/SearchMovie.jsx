import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate, Link } from "react-router-dom";

const SearchFilm = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState(""); // Deklarasi state untuk query pencarian
  const location = useLocation();
  const { searchMovie, searchQuery } = location.state;
  const navigate = useNavigate();

  // Function untuk menangani perubahan pada input pencarian
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Function untuk menangani pengiriman formulir pencarian
  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigasi ke halaman hasil pencarian dengan menyertakan query pencarian
    navigate("/hasil-search", { state: { searchQuery: query } });
  };

  // Function navbar Scroll
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

  return (
    <div className="container mx-auto bg-black">
      <div className="py-20">
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
              <li className="px-2 py-2 rounded-md text-sm font-medium text-white hover:bg-[#FFA500] hover:text-black flex items-center">
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
        {/* Judul pencarian */}
        <h1 className="text-center text-3xl font-bold my-5 text-white">
          Search Film : {searchQuery}
        </h1>
        {/* Daftar film hasil pencarian */}

        <div className="grid grid-cols-5 gap-5 py-5 px-5">
          {searchMovie.length > 0 ? ( // Periksa apakah ada hasil pencarian
            searchMovie.map((movie) => (
              <div
                key={movie.id}
                onClick={() => {
                  navigate("/movie-details", { state: { id: movie.id } }); // Navigasi ke halaman detail film
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer"
              >
                {/* Informasi film */}
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
            ))
          ) : (
            // Jika tidak ada hasil pencarian, tampilkan pesan "Data film kosong"
            <div className="text-center col-span-5 py-10 text-lg text-yellow-400">
              Film Tidak Ada
            </div>
          )}
        </div>
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

export default SearchFilm;
