function Card_Movie({
	movie: { title, vote_average, poster_path, release_date, original_language },
}) {
	return (
		<article className="h-full  cursor-pointer">
			<div className="h-full flex flex-col bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:bg-white/20  hover:shadow-xl">
				<div className="aspect-[2/3] overflow-hidden">
					<img
						src={`https://image.tmdb.org/t/p/w500/${poster_path}`}
						alt={`${title} Poster`}
						className="object-cover"
					/>
				</div>

				<div className="p-4">
					<h3 className="text-white text-center text-2xl">{title}</h3>

					<div className="flex flex-wrap items-center justify-center gap-2 text-sm mt-5">
						<div className="flex items-center space-x-1">
							<img src="/star.svg" className="h-4 w-4" alt="Rate" />
							<span className="text-yellow-400 font-medium">
								{vote_average ? vote_average.toFixed(1) : "N/A"}
							</span>
						</div>

						<span className="text-orange-400">•</span>

						<span className="text-white/80 uppercase text-xs">
							{original_language}
						</span>

						<span className="text-orange-400">•</span>

						<span className="text-white/80">
							{release_date ? release_date.split("-")[0] : "N/A"}
						</span>
					</div>
				</div>
			</div>
		</article>
	);
}

export default Card_Movie;
