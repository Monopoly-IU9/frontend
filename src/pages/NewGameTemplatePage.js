import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";

function NewGameTemplate() {
    const [gameName, setGameName] = useState('');
    const navigate = useNavigate();

    const handleCreateGame = (e) => {
        e.preventDefault();
        // handle create logic
        navigate('/admin');
    };

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Создать новый шаблон игры</h1>
            <div className="mb-3">
                <label className="form-label">Имя игры</label>
                <input type="text" className="form-control" value={gameName} onChange={(e) => setGameName(e.target.value)} />
            </div>
            <Button onClick={handleCreateGame} className="btn btn-primary">Создать игру</Button>
        </div>
    );
}

export default NewGameTemplate;
