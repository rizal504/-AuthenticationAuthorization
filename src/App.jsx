import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastContainer } from "react-toastify"; // Import ToastContainer
import "react-toastify/dist/ReactToastify.css"; // Import CSS for ToastContainer
import Home from "./Home";
import DetailFilm from "./DetailFilm";
import MoviePopuler from "./MoviePopular";
import SegeraTayang from "./SegeraTayang";
import TvSeries from "./TvSeries";
import DetailTvSeries from "./DetailTvSeries";
import SearchFilm from "./SearchMovie";
import SearchTv from "./SearchTV";
import Login from "./LoginPage";
import RegisterForm from "./Register";

export default function App() {
  return (
    <GoogleOAuthProvider clientId="114661423378-rtig0t8dte4speish42bf70ubh557kr7.apps.googleusercontent.com">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/movie-details" element={<DetailFilm />} />
          <Route path="/movie-populer" element={<MoviePopuler />} />
          <Route path="/segera-tayang" element={<SegeraTayang />} />
          <Route path="/tv-series" element={<TvSeries />} />
          <Route path="/detail-tv" element={<DetailTvSeries />} />
          <Route path="/hasil-search" element={<SearchFilm />} />
          <Route path="/search-tv" element={<SearchTv />} />
          <Route path="/register" element={<RegisterForm />} />
        </Routes>
      </Router>
      <ToastContainer /> {/* ToastContainer untuk menampilkan pesan toast */}
    </GoogleOAuthProvider>
  );
}
