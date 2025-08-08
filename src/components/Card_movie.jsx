function Card_Movie({movie :
    {title, vote_average, poster_path, release_date, original_language}}) {
    return ( 
        
        <article className="bg-purple-950 p-3 rounded-2xl shadow-inner shadow-light-100/10 mt-5 mx-15 ">
            <img src={`https://image.tmdb.org/t/p/w500/${poster_path}`} alt={`${title} Poster`} />
            
        <h3 className="text-white font-bold text-2xl">{title}</h3>
       
        <div className="flex">
        <img src="/star.svg" className="h-5" alt="Rate"/>
        <p className="text-white pl-2">{vote_average ? vote_average.toFixed(1): 'N/A'}</p>
        <span className="text-orange-600 mx-2">•</span>
        <p className="text-white">{original_language}</p>
        <span className="text-orange-600 mx-2">•</span>
        <p className="text-white">{release_date ? release_date.split('-')[0] : 'N/A'}</p>
        </div>
        </article>
        
     );
}

export default Card_Movie;