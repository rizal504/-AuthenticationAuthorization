import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { useLocation, useNavigate, Link } from "react-router-dom";
import NavbarTv from "./NavbarTv";

const SearchTv = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [query, setQuery] = useState(""); // Deklarasi state untuk query pencarian
  const location = useLocation();
  const { searchTv, searchQuery } = location.state;
  const navigate = useNavigate();

    // Pengujian token harus ada token
    useEffect(() => {
      console.log("localStorage ", localStorage.getItem("token"));
      if (localStorage.getItem("token") === null) {
        navigate("/");
      }
    }, []);

  // Function untuk menangani perubahan pada input pencarian
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // Function untuk menangani pengiriman formulir pencarian
  const handleSubmit = (event) => {
    event.preventDefault();
    // Navigasi ke halaman hasil pencarian dengan menyertakan query pencarian
    navigate("/search-tv", { state: { searchQuery: query } });
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
      <NavbarTv/>
        {/* Judul pencarian */}
        <h1 className="text-center text-3xl font-bold my-5 text-white">
          Search TV : {searchQuery}
        </h1>

        {/* Daftar TV hasil pencarian */}

        <div className="grid grid-cols-5 gap-5 py-5 px-5">
          {searchTv.length > 0 ? (
            searchTv.map((tv) => (
              <div
                key={tv.id}
                onClick={() => {
                  navigate("/detail-tv", { state: { id: tv.id } });
                }}
                className="relative bg-white shadow-xl rounded-xl overflow-hidden transition duration-300 transform hover:scale-105 cursor-pointer"
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
            ))
          ) : (
            <div className="text-center col-span-5 py-10 text-lg text-yellow-400">
              Data Series TV kosong
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

export default SearchTv;
