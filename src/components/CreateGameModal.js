import React, { useState } from 'react';

function CreateGameModal({ onCreateGame, onClose }) {
    const [gameName, setGameName] = useState('');

    const handleCreate = () => {
        const newGame = { id: Date.now(), name: gameName };
        onCreateGame(newGame);
    };

    return (
        <div className="modal">
            <h3>Create New Game</h3>
            <input
                type="text"
                placeholder="Game Name"
                value={gameName}
                onChange={(e) => setGameName(e.target.value)}
            />
            <button onClick={handleCreate}>Create</button>
            <button onClick={onClose}>Cancel</button>
        </div>
    );
}

export default CreateGameModal;
