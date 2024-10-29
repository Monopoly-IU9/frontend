import React from 'react';
import Deck from '../components/Deck';

function GamePage() {
    const gameCode = 'game-unique-code'; // Уникальный код игры

    return (
        <div>
            <h2>Game Control</h2>
            {/*<QRCode gameCode={gameCode} />*/}
            <div>
                <h3>Select Decks</h3>
                <Deck theme="Business" content="Some content for Business deck" />
            </div>
        </div>
    );
}

export default GamePage;
