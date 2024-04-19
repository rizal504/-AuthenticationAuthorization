import React, { useState } from "react";
import axios from "axios";
import { UserCircleIcon } from "@heroicons/react/20/solid";
import { useNavigate, Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const API_KEY = "c031317917e2399db20c8146bfb4fa9d";

const NavbarTv = () => {
  const [query, setQuery] = useState("");
  const [userDropdownOpen, setUserDropdownOpen] = useState(false); // State untuk mengontrol dropdown menu pengguna
  const [userProfile, setUserProfile] = useState(null);

  const navigate = useNavigate();

  const fetchDataTv = async () => {
    try {
      if (query.trim().length === 0) return alert("Inputkan Nama TV Series");
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/tv?query=${query}&api_key=${API_KEY}`
      );
      navigate("/search-tv", {
        state: { searchTv: response.data.results, searchQuery: query },
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
    fetchDataTv();
  };

  // Function untuk menampilkan/menyembunyikan dropdown
  const toggleUserDropdown = () => {
    setUserDropdownOpen(!userDropdownOpen);
  };

  // Function untuk logout
  const handleLogout = () => {
    const confirmLogout = window.confirm("Apakah Anda yakin ingin keluar?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate("/");
      setUserProfile(null);
    }
  };

  return (
    <div
      className={`px-5 flex justify-between items-center bg-black fixed top-0 left-0 w-full z-10 backdrop-blur-md`}
    >
      <div className="flex flex-1">
        <ul className="flex space-x-4 py-2">
          <li className="px-2 py-2 text-2xl font-medium text-[#FFA500]">
            <Link to={"/home"}>MovieKU</Link>
          </li>
          <li className="px-2 py-2 rounded-md text-sm font-medium text-black bg-[#FFA500] flex items-center">
            <Link to={"/home"}>Home</Link>
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
      <div className="bg-gray-800 overflow-hidden rounded-md ">
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
      <div>
        {/* Pengguna Dropdown */}
        <div className="relative">
          <button onClick={toggleUserDropdown}>
            <UserCircleIcon className="h-12 w-12 text-slate-200 mr-1 pl-1 flex items-center" />
          </button>
          {userDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-gray-800 rounded-md shadow-lg">
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavbarTv;
