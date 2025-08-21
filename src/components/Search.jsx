function Search({ searchMovie, setSearchMovie }) {
	return (
		<div className="max-w-md mx-auto">
			<div className="relative">
				<div className="absolute z-1 inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
					<img src="/search.svg" alt="search" className="h-5 w-5 text-black" />
				</div>
				<input
					type="text"
					placeholder="Search a movie..."
					className="w-full pl-12 pr-4 py-3 bg-white/20 backdrop-blur-sm border border-white/30 rounded-xl text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all duration-300"
					value={searchMovie}
					onChange={(e) => setSearchMovie(e.target.value)}
				/>
			</div>
		</div>
	);
}

export default Search;
