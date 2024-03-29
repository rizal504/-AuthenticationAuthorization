import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Home";

import DetailFilm from "./DetailFilm";
import MoviePopuler from "./MoviePopular";
import SegeraTayang from "./SegeraTayang";
import TvSeries from "./TvSeries";
import DetailTvSeries from "./DetailTvSeries";
import SearchFilm from "./SearchMovie";
import SearchTv from "./SearchTV";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/movie-details" element={<DetailFilm />} />
        <Route path="/movie-populer" element={<MoviePopuler />} />
        <Route path="/segera-tayang" element={<SegeraTayang />} />
        <Route path="/tv-series" element={<TvSeries />} />
        <Route path="/detail-tv" element={<DetailTvSeries />} />
        <Route path="/hasil-search" element={<SearchFilm />} />
        <Route path="/search-tv" element={<SearchTv />} />
      </Routes>
    </Router>
  );
}
