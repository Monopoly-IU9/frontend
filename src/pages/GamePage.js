import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Container, Button, Row, Col, ListGroup } from 'react-bootstrap';
import QRCodeModal from '../components/QRCodeModal';
import CardModal from '../components/CardModal';
import { hostGetCategoriesByGameID, finishGame, drawCard } from '../api/GameAPI';

function GamePage({ isHost }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const gameId = queryParams.get('id');
    const [gameInfo, setGameInfo] = useState(null);
    const [showModal, setShowModal] = useState(false); // Для QR-кода
    const [selectedCard, setSelectedCard] = useState(null); // Для карточек
    const [showCardModal, setShowCardModal] = useState(false); // Для модального окна с карточкой
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGameCategories = async () => {
            try {
                const data = await hostGetCategoriesByGameID(gameId);
                setGameInfo({
                    id: data.game_id,
                    name: `Игра`,
                    categories: data.categories,
                });
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
                alert('Не удалось загрузить категории игры.');
            }
        };

        fetchGameCategories();
    }, [gameId]);

    const handleEndGame = async () => {
        try {
            await finishGame(gameId);
            navigate(isHost ? '/games' : '/home');
        } catch (error) {
            console.error('Ошибка при завершении игры:', error);
            alert('Не удалось завершить игру.');
        }
    };

    const handleLogout = () => {
        navigate(isHost ? '/games' : '/home');
    };

    const handleShowModal = () => setShowModal(true); // Открытие модального окна
    const handleCloseModal = () => setShowModal(false); // Закрытие модального окна

    const handleCategoryClick = async (category) => {
        try {
            const cardData = await drawCard(gameId, category.id);
            setSelectedCard({
                id: cardData.number,
                description: cardData.description,
                color: cardData.color,
                categoryId: category.id,
                name: cardData.name,
            });
            setShowCardModal(true); // Открыть модальное окно с карточкой
        } catch (error) {
            console.error('Ошибка при взятии карточки:', error);
            alert('Данная категория пуста.');
        }
    };

    const handleCloseCardModal = () => setShowCardModal(false); // Закрытие карточки

    if (!gameInfo) return <div className="text-center mt-5">Загрузка...</div>;

    return (
        <Container className="my-5">
            <h2 className="text-primary">{gameInfo.name}</h2>

            {/* Вывод категорий игры */}
            <ListGroup className="mb-4">
                {gameInfo.categories.map((category) => (
                    <ListGroup.Item
                        key={category.id}
                        style={{
                            backgroundColor: `#${category.color}`,
                            color: 'white',
                            fontSize: '1.25rem',
                            padding: '12px 20px',
                            cursor: 'pointer',
                        }}
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category.name}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {isHost && (
                <Row className="justify-content-center mb-3">
                    <Col md={4}>
                        <Button variant="primary" className="w-100 mb-2" onClick={handleShowModal}>
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

            {/* Модальное окно для отображения карточки */}
            {selectedCard && (
                <CardModal
                    show={showCardModal}
                    onClose={handleCloseCardModal}
                    card={selectedCard}
                />
            )}
        </Container>
    );
}

export default GamePage;
