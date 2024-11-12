import React, { useEffect, useState } from 'react';
import {useParams, useNavigate, useLocation} from 'react-router-dom';
import {Container, Button, Row, Col, ListGroup} from 'react-bootstrap';
import QRCodeModal from "../components/QRCodeModal";
// import { fetchGameInfo, endGame } from '../api/GameAPI';

function GamePage({ isHost }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get('id');
    const [gameInfo, setGameInfo] = useState(null);
    const [showModal, setShowModal] = useState(false); // Состояние для отображения модального окна
    const navigate = useNavigate();

    // Временные данные заглушки для игры
    const placeholderGameInfo = {
        id: gameId,
        name: `Игра ${gameId}`,
        categories: [
            { id: 1, name: 'Категория 1', color: 'success' },
            { id: 2, name: 'Категория 2', color: 'danger' },
            { id: 3, name: 'Категория 3', color: 'primary' },
        ],
    };

    useEffect(() => {
        // Симуляция загрузки данных игры
        setGameInfo(placeholderGameInfo);
    }, [gameId]);

    const handleEndGame = () => {
        // Симуляция окончания игры
        navigate(isHost ? '/games' : '/home');
    };

    const handleLogout = () => {
        navigate(isHost ? '/games' : '/home');
    };

    const handleShowModal = () => setShowModal(true); // Открытие модального окна
    const handleCloseModal = () => setShowModal(false); // Закрытие модального окна

    if (!gameInfo) return <div>Loading...</div>;

    return (
        <Container className="my-5">
            <h2 className="text-primary">{gameInfo.name}</h2>

            {/* Вывод категорий игры с кастомными цветами и размером */}
            <ListGroup className="mb-4">
                {gameInfo.categories.map(category => (
                    <ListGroup.Item
                        key={category.id}
                        variant={category.color}
                        style={{ fontSize: '1.25rem', padding: '12px 20px' }}
                    >
                        {category.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {isHost && (
                <Row className="justify-content-center mb-3">
                    <Col md={4}>
                        <Button
                            variant="primary"
                            className="w-100 mb-2"
                            onClick={handleShowModal} // Показать модальное окно
                        >
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

            <Row className="justify-content-center mb-3">
                <Col md={4}>
                    <Button variant="secondary" className="w-100 mb-2" onClick={handleLogout}>
                        Выйти
                    </Button>
                </Col>
            </Row>

            {/* Модальное окно для отображения QR-кода */}
            <QRCodeModal show={showModal} onClose={handleCloseModal} gameId={gameId} />
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
