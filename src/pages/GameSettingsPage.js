import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Container, ListGroup, Button } from 'react-bootstrap';
import { hostGetCategoriesByGameID } from '../api/GameAPI';

function GameSettingsPage() {
    const location = useLocation();
    const navigate = useNavigate();

    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get('id');

    const [gameDetails, setGameDetails] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Индикатор загрузки

    useEffect(() => {
        if (gameId) {
            const fetchGameDetails = async () => {
                try {
                    const data = await hostGetCategoriesByGameID(gameId);
                    setGameDetails(data);
                } catch (error) {
                    console.error('Ошибка при загрузке данных игры:', error);
                    alert('Не удалось загрузить данные игры.');
                } finally {
                    setIsLoading(false);
                }
            };

            fetchGameDetails();
        }
    }, [gameId]);

    const handleStartGame = () => {
        navigate(`/game?id=${gameId}`);
    };

    if (isLoading) return <div className="text-center mt-5">Загрузка...</div>;

    if (!gameDetails) return <div className="text-center mt-5">Ошибка загрузки данных</div>;

    return (
        <Container className="container bg-light rounded p-4 shadow-sm">
            <Link to="/games" className="text-decoration-none d-flex align-items-center mb-3" style={{ color: '#0d6efd' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Назад
            </Link>
            <p className="text-muted mb-4">Выбранные категории для игры:</p>
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
