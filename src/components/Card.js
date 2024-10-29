import React from 'react';

function Card({ theme, content }) {
    return (
        <div className="card">
            <h3>{theme}</h3>
            <p>{content}</p>
        </div>
    );
}

export default Card;
