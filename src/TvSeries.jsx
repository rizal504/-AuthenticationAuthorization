import React, { useEffect, useState } from "react";
import axios from "axios";
import { StarIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";
import NavbarTv from "./NavbarTv";

const API_KEY = "c031317917e2399db20c8146bfb4fa9d";

const TvSeries = () => {
  const [dataTvSeries, setTvSeries] = useState([])
  const [currentPage, setCurrentPage] = useState(1);
  const [moviesPerPage] = useState(10);


  const navigate = useNavigate();

  //FEtch Data TV
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

  
  // Logic for pagination
  const indexOfLastMovie = currentPage * moviesPerPage;
  const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
  const currentMovies = dataTvSeries.slice(indexOfFirstMovie, indexOfLastMovie);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

    // Pengujian token harus ada token
    useEffect(() => {
      console.log("localStorage ", localStorage.getItem("token"));
      if (localStorage.getItem("token") === null) {
        navigate("/");
      }
    }, []);

  return (
    <div className="container mx-auto bg-black">
      {/* Navbar */}
      <NavbarTv/>
      {/* TV Series */}
      <div className="pt-20 pb-10">
        <div className=" px-20">
          <p className="text-5xl font-bold flex justify-center p-5 text-white">
            TV Series
          </p>
          <div className="grid grid-cols-5 gap-5 py-5 px-5">
            {currentMovies.map((tv) => (
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
export default TvSeries;
