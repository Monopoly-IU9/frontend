import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Row, Col, Card, Button } from 'react-bootstrap';
import { hostGetGames } from '../api/GameAPI';

function HostPage() {
    const [activeGames, setActiveGames] = useState([]);
    const [inactiveGames, setInactiveGames] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        // Получение данных о играх
        const fetchGames = async () => {
            try {
                const games = await hostGetGames();
                setActiveGames(games.filter((game) => game.status === 'started'));
                setInactiveGames(games.filter((game) => game.status === 'waiting'));
            } catch (error) {
                console.error('Ошибка при загрузке игр:', error);
                alert('Не удалось загрузить список игр.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchGames();
    }, []);

    if (isLoading) {
        return <div className="text-center mt-5">Загрузка...</div>;
    }

    return (
        <div className="container bg-light rounded p-4 shadow-sm">
            <h2 className="text-success">Активные Игры</h2>
            <Row className="mb-4">
                {activeGames.length > 0 ? (
                    activeGames.map((game) => (
                        <Col md={6} lg={4} key={game.id}>
                            <Card className="shadow-sm mb-3">
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                    <Button
                                        variant="success"
                                        onClick={() => navigate(`/game?id=${game.id}`)}
                                        className="w-100"
                                    >
                                        Перейти к Игре
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-muted">Нет активных игр</p>
                )}
            </Row>

            <h2 className="text-secondary">Неактивные Игры</h2>
            <Row>
                {inactiveGames.length > 0 ? (
                    inactiveGames.map((game) => (
                        <Col md={6} lg={4} key={game.id}>
                            <Card className="shadow-sm mb-3">
                                <Card.Body>
                                    <Card.Title>{game.name}</Card.Title>
                                    <Button
                                        variant="outline-primary"
                                        onClick={() => navigate(`/game-settings?id=${game.id}`)}
                                        className="w-100"
                                    >
                                        Настроить Игру
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                ) : (
                    <p className="text-muted">Нет неактивных игр</p>
                )}
            </Row>
        </div>
    );
}

export default HostPage;
