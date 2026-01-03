import { useEffect, useState } from 'react'

function App() {
  const [movies, setMovies] = useState([])

  useEffect(() => {
    // Pobieramy filmy z Twojego nowego portu 5001
    fetch('http://localhost:5001/movies')
      .then(res => res.json())
      .then(data => setMovies(data))
      .catch(err => console.error("Błąd pobierania:", err))
  }, [])

  return (
    <>
      <div className="min-h-screen p-8">
        <div className="noise-overlay"></div>
        <header className="mb-12 border-b-8 border-black pb-4 flex justify-between items-end">
          <div>
            <h1 className="text-7xl font-black italic uppercase leading-none tracking-tighter">
              VHS_CLUB
            </h1>
            <p className="text-xl font-bold tracking-[0.3em] mt-2">RETRO // NOIR // CURATION</p>
          </div>
          <div className="bg-yellow-400 border-4 border-black p-2 font-black shadow-neo uppercase">
            Items: {movies.length}
          </div>
        </header>

        {/* Siatka filmów */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
          {movies.map(movie => (
            <div key={movie.id} className="bg-white border-4 border-black p-4 shadow-neo hover:-translate-y-2 transition-transform cursor-crosshair group">
              <div className="relative mb-4 border-4 border-black overflow-hidden bg-black">
                <img 
                  src={movie.image} 
                  alt={movie.title}
                  className="w-full h-[400px] object-cover group-hover:scale-110 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                />
                <div className="absolute top-2 left-2 bg-red-600 text-white px-3 py-1 font-black text-sm uppercase italic border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                  {movie.category}
                </div>
              </div>
              
              <h2 className="text-2xl font-black uppercase mb-2 line-clamp-1">{movie.title}</h2>
              <p className="text-sm font-bold text-gray-700 mb-4 line-clamp-2 italic italic italic">"{movie.description}"</p>
              
              <div className="flex justify-between items-center border-t-4 border-black pt-4">
                <span className="text-2xl font-black">{movie.price} PLN</span>
                <button className="bg-black text-white px-6 py-2 font-black uppercase hover:bg-yellow-400 hover:text-black transition-colors border-2 border-black shadow-[4px_4px_0px_0px_rgba(255,255,255,0.3)]">
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App