import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { StarIcon } from "@heroicons/react/20/solid";
// import { ArrowUturnLeftIcon } from "@heroicons/react/24/outline";

const API_KEY = "c031317917e2399db20c8146bfb4fa9d";

const DetailFilm = () => {
  const navigate = useNavigate();
  let location = useLocation();
  const [detail, setDetail] = useState([]);
  const detailMovies = async () => {
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${location.state.id}?language=en-US&api_key=${API_KEY}`, // <-- diganti pake usestate
        { header: { accept: "application/json" } }
      );
      console.log("response data ", response.data);
      setDetail(response.data);
    } catch (err) {
      console.log("error fetching data: ", err);
    }
  };

  useEffect(() => {
    console.log("location ", location);
    detailMovies();
  }, []);

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-800 bg-blend-multiply h-[720px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detail?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-28 px-10 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${detail?.poster_path}`}
            alt={detail?.title}
            className="h-[500px]  rounded-lg"
          />
          <div className="text-white font-sans " key={detail?.id}>
            <div className="p-4">
              <h2 className="text-4xl font-semibold mb-2 font-arial">
                {detail?.title}
              </h2>
              <p className="text-lg">
                <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                {parseFloat(detail?.vote_average).toFixed(1)}/ 10
              </p>
              <p className="text-lg mb-2 border-b-2 pb-3 text-justify">
                {detail?.overview}
              </p>
              <p className="text-lg">Release Date : {detail?.release_date}</p>

              <p className="text-lg">Votes : {detail?.vote_count}</p>
              <p className="text-lg">
                Budget :{" "}
                {detail?.budget
                  ? `$${detail?.budget.toLocaleString("en-US")}`
                  : "N/A"}
              </p>
              <p className="text-lg">Runtime : {detail?.runtime} Minutes</p>
              <br />
              <p className="text-lg font-bold ">Genres :</p>
              <div className="flex gap-5">
                {detail?.genres?.map((genre) => (
                  <div className="p-2 border rounded text-black bg-[#FFA500] font-semibold">
                    <p>{genre.name}</p>
                  </div>
                ))}
              </div>
              {/* <button
                className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-00 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={() => {
                  navigate("/", { state: { id: detail?.id } });
                }}
              >
                <div >
                <ArrowUturnLeftIcon className="w-5 h-5 inline text-black" />{" "}
                </div>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailFilm;
