import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CreateGameModal from '../components/CreateGameModal';

function AdminPage() {
    const [showModal, setShowModal] = useState(false);
    const [games, setGames] = useState([]);

    const handleCreateGame = (newGame) => {
        setGames([...games, newGame]);
        setShowModal(false);
    };

    return (
        <div>
            <h2>Admin Panel</h2>
            <button onClick={() => setShowModal(true)}>Create New Game</button>
            <ul>
                {games.map((game, index) => (
                    <li key={index}>
                        {game.name} <Link to={`/admin/edit?id=${game.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
            {showModal && <CreateGameModal onCreateGame={handleCreateGame} onClose={() => setShowModal(false)} />}
        </div>
    );
}

export default AdminPage;
