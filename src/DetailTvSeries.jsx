import React, { useEffect} from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { getDetailTvSeries } from "./redux/actions/movieActions";
import { useDispatch, useSelector } from "react-redux";


const DetailTvSeries = () => {

  const dispatch = useDispatch();
  const id = useSelector((state) => state.movie.tvId);
  const detailTvSeries = useSelector((state) => state.movie.detailTvSeries.data);
  console.log("Tvserrrrr", detailTvSeries);

  useEffect(() => {
    dispatch(getDetailTvSeries(id));
  }, []);

  return (
    <div>
      <div
        className="bg-cover bg-fixed bg-no-repeat bg-gray-800 bg-blend-multiply h-[720px]"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/w500/${detailTvSeries?.backdrop_path})`,
        }}
      >
        <div className="flex justify-center container mx-auto py-28 px-10 gap-10 items-center backdrop-blur-sm">
          <img
            src={`https://image.tmdb.org/t/p/w500/${detailTvSeries?.poster_path}`}
            alt={detailTvSeries?.title}
            className="h-[500px]  rounded-lg"
          />
          <div className="text-white font-sans " key={detailTvSeries?.id}>
            <div className="p-4">
              <h2 className="text-3xl font-semibold mb-2">{detailTvSeries?.name}</h2>
              <p className="text-lg">
                <StarIcon className="w-5 h-5 inline text-yellow-400" />{" "}
                {parseFloat(detailTvSeries?.vote_average).toFixed(1)}/ 10
              </p>
              <p className="text-lg mb-2 border-b-2 pb-3 text-justify">
                {detailTvSeries?.overview}
              </p>
              <p className="text-lg">Status : {detailTvSeries?.status}</p>
              <p className="text-lg">Votes : {detailTvSeries?.vote_count}</p>
              <p className="text-lg">Data Realese : {detailTvSeries?.first_air_date}</p>
              <p className="text-lg">
                production_countries :{" "}
                {detailTvSeries?.production_countries
                  ?.map((countries) => countries.name)
                  .join(", ")}
              </p>
              <p className="text-lg">
                production_companies :{" "}
                {detailTvSeries?.production_companies
                  ?.map((produksi) => produksi.name)
                  .join(", ")}
              </p>
              <br />
              <p className="text-lg font-bold ">Genres :</p>
              <div className="flex gap-5">
                {detailTvSeries?.genres?.map((genre) => (
                  <div className="p-2 border rounded text-black bg-[#FFA500] font-semibold">
                    <p>{genre.name}</p>
                  </div>
                ))}
              </div>
              {/* <button
                className="mt-7 px-4 py-2  font-sans bg-white border border-solid border-gray-400 text-black rounded-md shadow-md hover:bg-gray-00 hover:border-gray-500 focus:outline-none focus:ring focus:ring-gray-300"
                onClick={() => {
                  navigate("/tv-series", { state: { id: DetailTvSeries?.id } });
                }}
              >
                <div className="w-5 h-5 ">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path
                      transform="rotate(180 256 256)"
                      d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z"
                    />
                  </svg>
                </div>
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailTvSeries;
