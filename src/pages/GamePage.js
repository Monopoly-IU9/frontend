import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col } from 'react-bootstrap';
import { fetchGameInfo, endGame } from '../api/GameAPI';

function GamePage({ isHost }) {
    const { id: gameId } = useParams();
    const [gameInfo, setGameInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const loadGameInfo = async () => {
            try {
                const response = await fetchGameInfo(gameId);
                setGameInfo(response.data);
            } catch (error) {
                console.error("Error loading game info:", error);
            }
        };
        loadGameInfo();
    }, [gameId]);

    const handleEndGame = async () => {
        try {
            await endGame(gameId);
            navigate(isHost ? '/host' : '/home');
        } catch (error) {
            console.error("Error ending game:", error);
        }
    };

    const handleLogout = () => {
        navigate(isHost ? '/host' : '/home');
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
                        <Button variant="secondary" className="w-100 mb-2" onClick={handleLogout}>
                            Выйти
                        </Button>
                    </Col>
                    <Col md={4}>
                        <Button variant="danger" className="w-100" onClick={handleEndGame}>
                            Закончить Игру
                        </Button>
                    </Col>
                </Row>
            )}

            {/* Контент игры для всех пользователей */}
            <div className="text-center mt-5">
                <h5>Добро пожаловать в игру!</h5>
                <p>Следуйте инструкциям на экране для продолжения.</p>
            </div>
        </Container>
    );
}

export default GamePage;
