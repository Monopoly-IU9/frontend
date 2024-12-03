import React, { useEffect, useState } from 'react';
import {Link, useLocation, useNavigate} from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';

function GameSettingsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get('id');

    const [gameDetails, setGameDetails] = useState(null);

    const placeholderGameDetails = {
        id: gameId,
        name: `${gameId}`,
        categories: [
            { id: 1, name: 'Категория 1' },
            { id: 2, name: 'Категория 2' },
        ],
    };

    useEffect(() => {
        setGameDetails(placeholderGameDetails);
    }, [gameId]);
    // обработка запуска игры
    const handleStartGame = () => {
        navigate(`/game?id=${gameId}`);
    };

    if (!gameDetails) return <div>Loading...</div>;

    return (
        <Container className="container bg-light rounded p-4 shadow-sm">
            <Link to="/games" className="text-decoration-none d-flex align-items-center mb-3" style={{ color: '#0d6efd' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Назад
            </Link>
            <h2 className="text-primary">Настройки Игры: {gameDetails.name}</h2>
            <p className="text-muted mb-4">Выбранные категории для этой игры:</p>
            <ListGroup className="mb-4">
                {gameDetails.categories.map(category => (
                    <ListGroup.Item key={category.id}>{category.name}</ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="primary" size="lg" onClick={handleStartGame} className="w-100">
                Начать Игру
            </Button>
        </Container>
    );
}

export default GameSettingsPage;


// useEffect(() => {
    //     const loadGameDetails = async () => {
    //         try {
    //             const response = await fetchGameDetails(gameId);
    //             setGameDetails(response.data);
    //         } catch (error) {
    //             console.error("Error loading game details:", error);
    //         }
    //     };
    //     loadGameDetails();
    // }, [gameId]);
    //
    // const handleStartGame = async () => {
    //     try {
    //         await activateGame(gameId);
    //         navigate(`/game?id=${gameId}`);
    //     } catch (error) {
    //         console.error("Error starting game:", error);
    //     }
    // };

