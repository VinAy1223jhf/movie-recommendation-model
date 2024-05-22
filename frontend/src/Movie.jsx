import React, { useState } from 'react';

function Movie({ title, poster }) {

    return (
        <div>
            <h2>{title}</h2>
            <img src={poster} alt={title}   />
        </div>
    );
}

export default Movie;
