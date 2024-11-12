import React, { useState, useEffect } from 'react';
import CategoryModal from '../components/CategoryModal';
import SetModal from '../components/SetModal';
import { Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

function CategoryPage() {
    const [name, setName] = useState('Category 1');
    const [color, setColor] = useState('#0000FF');
    const [cards, setCards] = useState([
        { id: 1, description: 'Пример карточки 1', tags: ['tag1', 'tag2'] },
        { id: 2, description: 'Пример карточки 2', tags: ['tag2', 'tag3'] },
        { id: 3, description: 'Пример карточки 3', tags: ['tag1'] }
    ]);
    const [sets, setSets] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [showSetModal, setShowSetModal] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Главный набор, содержащий все карточки категории
        setSets([{ name: 'Главный набор', cards: cards, isMain: true }]);
    }, [cards]);

    const handleUpdateCategory = () => {
        navigate(`/admin/categories`);
    };

    const handleAddCard = (newCard) => {
        setCards([...cards, { ...newCard, id: Date.now() }]);
    };

    const handleEditCard = (updatedCard) => {
        setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
    };

    const handleDeleteCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };

    const handleAddSet = (newSet) => {
        setSets([...sets, { ...newSet, id: Date.now() }]);
    };

    const handleEditSet = (updatedSet) => {
        setSets(
            sets.map((set) => (set.id === updatedSet.id ? updatedSet : set))
        );
    };

    const handleDeleteSet = (id) => {
        setSets(sets.filter((set) => set.id !== id && !set.isMain));
    };

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin/categories" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Изменить категорию</h1>

            {/* Название и цвет */}
            <div className="mb-3">
                <label className="form-label">Имя категории</label>
                <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label className="form-label">Цвет категории</label>
                <input
                    type="color"
                    className="form-control form-control-color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                />
            </div>

            {/* Кнопка добавления карточки */}
            <div className="mb-3">
                <Button onClick={() => { setShowModal(true); setSelectedCard(null); }} className="btn btn-primary mb-2">
                    Добавить карточку
                </Button>
            </div>

            <CategoryModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={(card) => selectedCard ? handleEditCard(card) : handleAddCard(card)}
                card={selectedCard}
            />

            {/* Список карточек */}
            <h4>Карточки</h4>
            <ListGroup className="mb-4">
                {cards.map((card) => (
                    <ListGroup.Item key={card.id} className="d-flex justify-content-between align-items-center">
                        <span onClick={() => { setSelectedCard(card); setShowModal(true); }}>{card.description}</span>
                        <Button
                            variant="danger"
                            size="sm"
                            onClick={() => handleDeleteCard(card.id)}
                        >
                            Удалить
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Кнопка добавления набора */}
            <Button onClick={() => { setShowSetModal(true); setSelectedSet(null); }} className="btn btn-info mb-2">
                Добавить набор
            </Button>
            <SetModal
                show={showSetModal}
                onClose={() => setShowSetModal(false)}
                onSave={(set) => selectedSet ? handleEditSet(set) : handleAddSet(set)}
                set={selectedSet}
                cards={cards}
            />

            {/* Список наборов */}
            <h4>Наборы</h4>
            <ListGroup>
                {sets.map((set) => (
                    <ListGroup.Item
                        key={set.id}
                        className="d-flex justify-content-between align-items-center"
                        action
                        onClick={() => {
                            if (!set.isMain) {
                                setSelectedSet(set);
                                setShowSetModal(true);
                            }
                        }}
                    >
                        {set.name}
                        {!set.isMain && (
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleDeleteSet(set.id);
                                }}
                            >
                                Удалить
                            </Button>
                        )}
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Кнопка сохранения изменений */}
            <Button onClick={handleUpdateCategory} className="btn btn-success mt-3">
                Сохранить изменения
            </Button>
        </div>
    );
}

export default CategoryPage;
