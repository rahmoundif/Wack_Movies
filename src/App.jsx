import { useState } from "react";
import './App.css'
import Search from "./components/search";

function App() {

  const [searchMovie, setSearchMovie] = useState("");


  return (
    <>
    <header className=''>
      <img src="/wm_logo.png" alt="" />
        </header>
<h1 className='text-center text-4xl mx-[40px]'>Find Movies you'll Enjoy without the Hassle</h1>
        <Search searchMovie={searchMovie} setSearchMovie={setSearchMovie}/>
    </>
  )
}

export default App
