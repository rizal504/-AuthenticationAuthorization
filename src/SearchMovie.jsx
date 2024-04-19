import React, {useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const SearchFilm = () => {
  const location = useLocation();
  const { searchMovie, searchQuery } = location.state;
  const navigate = useNavigate();

  // Pengujian token harus ada token
  useEffect(() => {
    console.log("localStorage ", localStorage.getItem("token"));
    if (localStorage.getItem("token") === null) {
      navigate("/");
    }
  }, []);


  return (
    <div className="container mx-auto bg-black">
      <div className="py-20">
        {/* Navbar */}
       <Navbar/>
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
