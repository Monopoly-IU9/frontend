import React from 'react';

function Deck({ theme, content }) {
    return (
        <div className="deck">
            <h3>{theme}</h3>
            <p>{content}</p>
        </div>
    );
}

export default Deck;
