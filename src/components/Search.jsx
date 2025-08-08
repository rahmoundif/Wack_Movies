




function search({searchMovie, setSearchMovie}) {
    
    return ( 
    <>

    <section className="flex bg-white/50 rounded-2xl mx-[150px] p-2 mt-10">
        <img src="/search.svg" alt="search" />
    <input 
    type="text"
    placeholder="Search a movie..."
    className="pl-2"
    value={searchMovie}
     onChange={(e)=>setSearchMovie(e.target.value)}
    />

    </section>
    </> 
    );
}

export default search;