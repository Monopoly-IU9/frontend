import React, { useState, useEffect } from 'react';
import CategoryModal from '../components/CategoryModal';
import SetModal from '../components/SetModal';
import { Button, ListGroup } from 'react-bootstrap';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getCategoryData, deleteCategory } from '../api/CategoriesAPI';

function CategoryPage() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#FFFFFF');
    const [cards, setCards] = useState([]);
    const [sets, setSets] = useState([]);
    // Статус модальных окон
    const [showModal, setShowModal] = useState(false);
    const [showSetModal, setShowSetModal] = useState(false);
    // храним выбранные карточки
    const [selectedCard, setSelectedCard] = useState(null);
    const [selectedSet, setSelectedSet] = useState(null);
    // навигация по страницам
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get('id');

    useEffect(() => {
        if (categoryId) {
            fetchCategoryData();
        }
    }, [categoryId]);

    const fetchCategoryData = async () => {
        try {
            const data = await getCategoryData(categoryId);
            setName(data.name);
            setColor(`#${data.color}`);
            setCards(data.cards);
            setSets(data.sets);
        } catch (error) {
            console.error('Ошибка при загрузке данных категории:', error);
        }
    };

    // обработка изменения категории
    const handleUpdateCategory = () => {
        navigate(`/admin/categories`);
    }

    const handleDeleteCategory = async () => {
        if (!categoryId) {
            console.error('ID категории не найден');
            return;
        }
        try {
            await deleteCategory(categoryId); // Вызов API для удаления
            navigate(`/admin/categories`); // Возврат на страницу категорий после удаления
        } catch (error) {
            console.error('Ошибка при удалении категории:', error);
        }
    };
    // обработка добавления новой карточки
    const handleAddCard = (newCard) => {
        setCards([...cards, { ...newCard, id: Date.now() }]);
    };
    // обработка изменения карточки
    const handleEditCard = (updatedCard) => {
        setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
    };
    // обработка удаления категории
    const handleDeleteCard = (id) => {
        setCards(cards.filter((card) => card.id !== id));
    };
    // обработка создания набора
    const handleAddSet = (newSet) => {
        setSets([...sets, { ...newSet, id: Date.now() }]);
    };
    // обработка изменения набора
    const handleEditSet = (updatedSet) => {
        setSets(sets.map((set) => (set.id === updatedSet.id ? updatedSet : set)));
    };
    // обработка удаления набора
    const handleDeleteSet = (id) => {
        setSets(sets.filter((set) => set.id !== id));
    };

    return (
        <div className="container bg-light rounded p-4 shadow-sm">
            {/* Кнопка "Назад" */}
            <Link
                to="/admin/categories"
                className="text-decoration-none d-flex align-items-center mb-3"
                style={{ color: '#0d6efd' }}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-left me-1"
                    viewBox="0 0 16 16"
                >
                    <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"
                    />
                </svg>
                Категории
            </Link>

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

            {/* Список карточек */}
            <h4>Карточки</h4>
            <Button
                onClick={() => {
                    setShowModal(true);
                    setSelectedCard(null);
                }}
                className="btn btn-primary mb-2"
            >
                Добавить карточку
            </Button>

            <CategoryModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={(card) => selectedCard ? handleEditCard(card) : handleAddCard(card)}
                card={selectedCard}
            />

            <ListGroup className="mb-4">
                {cards.map((card) => (
                    <ListGroup.Item key={card.id} className="d-flex justify-content-between align-items-center">
                        <span onClick={() => {
                            setSelectedCard(card);
                            setShowModal(true);
                        }}>{card.description}</span>
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

            {/* Список наборов */}
            <h4>Наборы</h4>
            <Button
                onClick={() => {
                    setShowSetModal(true);
                    setSelectedSet(null);
                }}
                className="btn btn-primary mb-2"
            >
                Добавить набор
            </Button>

            <SetModal
                show={showSetModal}
                onClose={() => setShowSetModal(false)}
                onSave={(set) => selectedSet ? handleEditSet(set) : handleAddSet(set)}
                set={selectedSet}
                cards={cards}
            />

            <ListGroup className="mb-4">
                {sets.map((set) => (
                    <ListGroup.Item
                        key={set.id}
                        className="d-flex justify-content-between align-items-center"
                        action
                        onClick={() => {
                            setSelectedSet(set);
                            setShowSetModal(true);
                        }}
                    >
                        {set.name}
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
                    </ListGroup.Item>
                ))}
            </ListGroup>

            {/* Кнопка сохранения изменений */}
            <Button onClick={handleUpdateCategory} className="btn btn-success mt-3">
                Сохранить изменения
            </Button>
            <Button onClick={handleDeleteCategory} className="btn btn-danger mt-3 ms-2">
                Удалить
            </Button>

        </div>
    );
}

export default CategoryPage;
