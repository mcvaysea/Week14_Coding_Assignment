import "./App.css";
import { useState, useEffect } from "react";
import MovieCard from "./MovieCard";

import SearchIcon from "./search.svg";


const API_URL = "http://www.omdbapi.com?apikey=ac6970a3";

const App = () => {
	const [movies, setMovies] = useState([]);
	const [searchTerm, setSearchTerm] = useState("");

	const searchMovies = async (title) => {
		const response = await fetch(`${API_URL}&s=${title}`);
		const data = await response.json();

		setMovies(data.Search);
	};

	useEffect(() => {
		searchMovies("Harry Potter");
	}, []);

	return (
		<div className="App">
			<h1>Welcome to MovieFlix</h1>

			<div className="search">
				<input
					placeholder="Search for movies (ex: Harry Potter)"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
				<img src={SearchIcon} alt="search" onClick={() => searchMovies(searchTerm)} />
			</div>

			{movies?.length > 0 ? (
				<div className="container">
					{movies.map((movie) => (
						<MovieCard movie={movie} />
					))}
				</div>
			) : (
				<div className="empty">
					<h2>No movies found</h2>
				</div>
			)}
		</div>
	);
};

export default App;
