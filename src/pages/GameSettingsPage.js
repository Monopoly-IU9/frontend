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

    const handleStartGame = () => {
        navigate(`/game?id=${gameId}`);
    };

    if (!gameDetails) return <div>Loading...</div>;

    return (
        <Container className="my-5">
            <Link to="/games" className="btn btn-outline-secondary mb-3">Назад</Link>
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

