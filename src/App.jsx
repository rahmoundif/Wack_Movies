import { useState, useEffect } from "react";
import './App.css'
import Search from "./components/Search";
import Loading_Spinner from "./components/Loading_Spinner";
import Card_Movie from "./components/Card_movie";
import { useDebounce } from "react-use";
import { updateSearchCount } from "./appwrite";

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

// biome-ignore lint/correctness/useExhaustiveDependencies: <Dependency issue>
useEffect(() => {
fetchMovies(debounceSearchMovie);
},[debounceSearchMovie]);

  return (
    <>
    <header className=''>
      <img src="/wm_hero.png" alt="Wack Movies" />
<h1 className='text-center text-3xl mx-[40px]'>Find Movies you'll Enjoy without the Hassle</h1>

        <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>

        </header>
        <h2>All Movies</h2>

        {isLoading ? (
          <Loading_Spinner/>
        ) : errorMessage ? (
            <p className="text-red-600">{errorMessage}</p> 
          ) : (
            <ul>
              {movieList.map((movie) => (
                <Card_Movie key={movie.id} movie={movie}/>
              ))}
            </ul>
          )
        }
        
        
    </>
  )
}

export default App
