import React, { useState, useEffect } from 'react';
import './App.css';
import Movie from './Movie';
import Filter from './Filter';
import Recommendations from './components/Recomendations';

function App() {
  const [popular, setPopular] = useState([]);
  const [filtered, setFiltered] =useState([]);
  const [activeGenre, setActiveGenre]=useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);

  useEffect(() => {
    fetchPopular();
  }, []);

  async function fetchPopular() {
    const data = await fetch("https://api.themoviedb.org/3/movie/popular?api_key=6f0474e3d6b5a4909d8c625cf387193b&language=en-US&page=1");
    const movies = await data.json();
    setPopular(movies.results);
    setFiltered(movies.results);
  }

  const handleSearch = () => {
    setShowRecommendations(true);
  };

  return (
    <div className="App">
      {showRecommendations ? (
        <div className="recommender">
          <Recommendations onSearch={handleSearch} />
        </div>
      ) : (
        <>
          <div className="recommender">
            <Recommendations onSearch={handleSearch} />
          </div>
          <Filter popular={popular} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre}/>
          <div className="popular-movies">
            {filtered.map((movie) => (
              <Movie key={movie.id} title={movie.title} poster={'https://image.tmdb.org/t/p/w500' + movie.poster_path} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
