import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
// import { fetchGamesForHost } from '../api/GameAPI';

function HostPage() {
    // Временные данные-заглушки
    const placeholderGames = [
        { id: 1, name: 'Активная Игра 1', isActive: true },
        { id: 2, name: 'Активная Игра 2', isActive: true },
        { id: 3, name: 'Неактивная Игра 1', isActive: false },
        { id: 4, name: 'Неактивная Игра 2', isActive: false },
        { id: 5, name: 'Неактивная Игра 3', isActive: false },
    ];

    const [activeGames, setActiveGames] = useState([]);
    const [inactiveGames, setInactiveGames] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        // Разделение игр из заглушек на активные и неактивные
        setActiveGames(placeholderGames.filter(game => game.isActive));
        setInactiveGames(placeholderGames.filter(game => !game.isActive));
    }, []);

    return (
        <Container className="my-5">
            <h2 className="text-primary mb-4">Ваши Игры</h2>

            <h3 className="text-success">Активные Игры</h3>
            <Row className="mb-4">
                {activeGames.length > 0 ? activeGames.map(game => (
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
                )) : <p className="text-muted">Нет активных игр</p>}
            </Row>

            <h3 className="text-secondary">Неактивные Игры</h3>
            <Row>
                {inactiveGames.length > 0 ? inactiveGames.map(game => (
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
                )) : <p className="text-muted">Нет неактивных игр</p>}
            </Row>
        </Container>
    );
}

export default HostPage;


// useEffect(() => {
    //     const loadGames = async () => {
    //         try {
    //             const response = await fetchGamesForHost();
    //             const games = response.data;
    //             setActiveGames(games.filter(game => game.isActive));
    //             setInactiveGames(games.filter(game => !game.isActive));
    //         } catch (error) {
    //             console.error("Error loading games:", error);
    //         }
    //     };
    //     loadGames();
    // }, []);
