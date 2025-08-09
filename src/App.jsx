import { useState, useEffect } from "react";
import './App.css'
import Search from "./components/Search";
import Loading_Spinner from "./components/Loading_Spinner";
import Card_Movie from "./components/Card_movie";
import { useDebounce } from "react-use";
import { updateSearchCount, getSearchTrendCount } from "./appwrite";

const API_BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = import.meta.env.VITE_TMDB_API;
const API_OPTIONS = {
  method: 'GET',
  headers:{
    accept : 'application/json',
     Authorization : `Bearer ${API_KEY}`
  }
}

function App() {

  const [searchMovie, setSearchMovie] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [debounceSearchMovie, setDebounceSearchMovie] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);

  useDebounce(()=> setDebounceSearchMovie(searchMovie), 1000, [searchMovie])

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
  try {
   const endpoint = query 
   ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
   :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

   const response = await fetch(endpoint, API_OPTIONS);

   if(!response.ok){
    throw new Error('Failed to Fetch the Movies')
  }

  const data = await response.json()

  if(data.response === 'false'){
  setErrorMessage(data.Error || 'failed to fetch Movies')
  setMovieList([])
  return;
  }

  setMovieList(data.results || [])

  if(query && data.results.length > 0) {
    await updateSearchCount(query, data.results[0]);
  }

  } catch(error){
    setErrorMessage (`Error fetching the movies ${error} try later`);
  } finally {
    setIsLoading(false)
  }
}

const LoadingFetchMovies = async () => {
  try {
    const movies = await getSearchTrendCount();
    setTrendingMovies(movies);
  } catch (error) {
    console.error(`Error Fetching the trending movies : ${error}`)
  }
}

// biome-ignore lint/correctness/useExhaustiveDependencies: <Dependency issue>
useEffect(() => {
fetchMovies(debounceSearchMovie);
},[debounceSearchMovie]);

useEffect(() => {
  LoadingFetchMovies()
}, []);

  return (
     <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <div className="mx-auto px-4 py-6 max-w-7xl">
        <header className="text-center mb-8 lg:mb-12">
          <div className="mb-6">
            <img 
              src="/wm_hero.png" 
              alt="Wack Movies" 
              className="mx-auto h-60 md:h-70 lg:h-90 object-contain"
            />
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl text-white mb-6 px-4 max-w-4xl mx-auto">
            Where cinema goes wild!
          </h1>
          <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>
        </header>

        
        {trendingMovies.length > 0 && (
          <section className="mb-8 lg:mb-12 ">
            <h2 className="text-xl md:text-2xl text-white text-center mb-6">
              Trending Movies
            </h2>
            <div className=" flex justify-center backdrop-blur-sm rounded-2xl p-4 md:p-6 overflow-x-auto scroll-smooth snap-x snap-mandatory [-webkit-overflow-scrolling:touch]">
              <div className="flex overflow-x-visible gap-4">
                {trendingMovies.map((movie, index) => (
                  <div key={movie.$id} className="relative group">
                    <div className="fixed w-5 h-5 md:w-10 md:h-10 rounded-br-2xl bg-gradient-to-br from-yellow-400 to-orange-500 text-gray-800 shadow-lg flex items-center justify-center z-10 text-xs md:text-sm font-extrabold" >
  {index + 1}
</div>
                    <div className="aspect-[2/3] h-[250px] mr-5 rounded-lg ">
                      <img 
                        src={movie.poster_url} 
                        alt={movie.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <p className="text-white text-sm mt-2 text-center px-1">
                      {movie.title}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        
        
        <section>
          <h2 className="text-xl md:text-2xl text-white text-center mb-6">
              All Movies
            </h2>

          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loading_Spinner/>
            </div>
          ) : errorMessage ? (
            <div className="text-center py-12">
              <p className="text-red-400 text-lg">{errorMessage}</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6 items-stretch">
              {movieList.map((movie) => (
                <Card_Movie key={movie.id} movie={movie}/>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default App