import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { fetchGameDetails, activateGame } from '../api/GameAPI';

function GameSettingsPage() {
    const { id: gameId } = useParams();
    const [gameDetails, setGameDetails] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGameDetails = async () => {
            try {
                const response = await fetchGameDetails(gameId);
                setGameDetails(response.data);
            } catch (error) {
                console.error("Error loading game details:", error);
            }
        };
        loadGameDetails();
    }, [gameId]);

    const handleStartGame = async () => {
        try {
            await activateGame(gameId);
            navigate(`/game?id=${gameId}`);
        } catch (error) {
            console.error("Error starting game:", error);
        }
    };

    if (!gameDetails) return <div>Loading...</div>;

    return (
        <Container className="my-5">
            <h2 className="text-primary">Настройки Игры: {gameDetails.name}</h2>
            <p className="text-muted mb-4">Выбранные категории для этой игры:</p>
            <ListGroup className="mb-4">
                {gameDetails.categories.map(category => (
                    <ListGroup.Item key={category.id}>{category.name}</ListGroup.Item>
                ))}
            </ListGroup>
            <Button variant="primary" size="lg" onClick={handleStartGame} className="w-100">
                Создать Игру
            </Button>
        </Container>
    );
}

export default GameSettingsPage;
