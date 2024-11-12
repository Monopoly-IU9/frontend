import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
// import { fetchGameInfo, endGame } from '../api/GameAPI';

function GamePage({ isHost }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get('id');
    const [gameInfo, setGameInfo] = useState(null);
    const navigate = useNavigate();

    // Временные данные заглушки для игры
    const placeholderGameInfo = {
        id: gameId,
        name: `Игра ${gameId}`,
        description: `Описание игры ${gameId}`,
        categories: [{ id: 1, name: 'Категория 1' }, { id: 2, name: 'Категория 2' }],
    };

    useEffect(() => {
        // Симуляция загрузки данных игры
        setGameInfo(placeholderGameInfo);
    }, [gameId]);

    const handleEndGame = () => {
        // Симуляция окончания игры
        alert(`Игра ${gameId} завершена`);
        navigate(isHost ? '/games' : '/home');
    };

    const handleLogout = () => {
        navigate(isHost ? '/games' : '/home');
    };

    if (!gameInfo) return <div>Loading...</div>;

    return (
        <Container className="my-5">
            <h2 className="text-primary">{gameInfo.name}</h2>
            <p className="text-muted mb-4">{gameInfo.description || "Описание игры"}</p>

            {isHost && (
                <Row className="justify-content-center mb-3">
                    <Col md={4}>
                        <Button variant="info" className="w-100 mb-2" onClick={() => alert(`QR-код: /game?id=${gameId}`)}>
                            Показать QR-код
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Button variant="danger" className="w-100" onClick={handleEndGame}>
                            Закончить Игру
                        </Button>
                    </Col>
                </Row>
            )}
            <Col md={4}>
                <Button variant="secondary" className="w-100 mb-2" onClick={handleLogout}>
                    Выйти
                </Button>
            </Col>


        </Container>
    );
}

export default GamePage;


// useEffect(() => {
    //     const loadGameInfo = async () => {
    //         try {
    //             const response = await fetchGameInfo(gameId);
    //             setGameInfo(response.data);
    //         } catch (error) {
    //             console.error("Error loading game info:", error);
    //         }
    //     };
    //     loadGameInfo();
    // }, [gameId]);

    // const handleEndGame = async () => {
    //     try {
    //         await endGame(gameId);
    //         navigate(isHost ? '/host' : '/home');
    //     } catch (error) {
    //         console.error("Error ending game:", error);
    //     }
    // };
