import React, { useState } from 'react';
import Movie from '../Movie';

function Recommendations({ onSearch }) {
    const [movie, setMovie] = useState('');
    const [recommendations, setRecommendations] = useState([]);


    const fetchRecommendations = async () => {
        try {
            const response = await fetch('http://localhost:5000/recommend', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ movie }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const movieDetails = data.names.map((name, index) => ({
                title: name,
                poster: data.posters[index],
            }));
            setRecommendations(movieDetails);
            console.log(recommendations);
            onSearch(); // Call the parent component's function to change the view
        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    };

    return (
        <div>
            <h1>Movie Recommender System</h1>
            <input
                className='input'
                type="text"
                value={movie}
                onChange={(e) => setMovie(e.target.value)}
                placeholder="Enter a movie name"
            />
            <button className='recommendButton' onClick={fetchRecommendations}>Recommend</button>
            <div className='recommendations'>
                {recommendations.map((movie,index) => (
                    <Movie key={index} title={movie.title} poster={movie.poster} />
                ))}
            </div>
        </div>
    );
}

export default Recommendations;
