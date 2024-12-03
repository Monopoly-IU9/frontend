import React, {useState, useEffect} from 'react';
import CategoryModal from '../components/CategoryModal';
import SetModal from '../components/SetModal';
import {Button, ListGroup, Collapse} from 'react-bootstrap';
import {Link, useNavigate, useSearchParams} from 'react-router-dom';
import {getCategoryData, deleteCategory} from '../api/CategoriesAPI';
import {addSet} from "../api/SetsAPI";
import {addCard, deleteCard, editCard} from "../api/CardsAPI";

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
    const [openCards, setOpenCards] = useState(false);
    const [openSets, setOpenSets] = useState(false);
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
    const handleAddCard = async (newCard) => {
        console.log(newCard)
        try {
            // Отправка запроса на сервер
            const response = await addCard(categoryId, newCard.description, newCard.tags);

            // Добавление карточки в локальное состояние
            setCards([...cards, { ...newCard, id: response.card_id }]);
        } catch (error) {
            console.error('Ошибка при добавлении карточки через API:', error);

            // В случае ошибки можно добавить локально (опционально)
            setCards([...cards, { ...newCard, id: Date.now() }]);
        }
    };

    // обработка изменения карточки
    const handleEditCard = async (updatedCard) => {
        console.log(updatedCard)
        try {
            // Отправка запроса на сервер
            const response = await editCard(updatedCard.id, updatedCard.description, updatedCard.tags);

            // Добавление карточки в локальное состояние
            setCards(cards.map((card) => (card.id === updatedCard.id ? updatedCard : card)));
        } catch (error) {
            console.error('Ошибка при изменении карточки через API:', error);
        }

    };
    // обработка удаления карточки
    const handleDeleteCard = async (id) => {
        console.log(id)
        try {
            const response = await deleteCard(id);
            setCards(cards.filter((card) => card.id !== id));
        } catch (error) {
            console.error('Ошибка при удалении карточки:', error);
        }
    };
    // обработка создания набора
    const handleAddSet = async (newSet) => {
        const cardIds = newSet.cards.map((card) => card.id);
        try {
            // Отправка нового набора на сервер
            const response = await addSet(newSet.name, categoryId, cardIds);
            setSets([...sets, { ...newSet, id: response.set_id}]);
        } catch (error) {
            console.error('Ошибка при добавлении набора через API:', error);
        }
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
                style={{color: '#0d6efd'}}
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

            {/* Визуализация категории */}
            <div
                className="mb-4 d-flex justify-content-center align-items-center"
                style={{
                    backgroundColor: color,
                    borderRadius: '8px',
                    padding: '10px',
                    color: '#ffffff',
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '1.2rem',
                }}
            >
                {name || 'Пример'}
            </div>

            <h4
                onClick={() => setOpenCards(!openCards)}
                aria-controls="cards-collapse"
                aria-expanded={openCards}
                className="d-flex justify-content-between align-items-center cursor-pointer"
            >
                Карточки
                <Button variant="link" className="text-decoration-none">
                    {openCards ? '▲' : '▼'}
                </Button>
            </h4>

            <Collapse in={openCards}>
                <div id="cards-collapse">
                    <ListGroup className="mb-4">
                        {cards.map((card) => (
                            <ListGroup.Item key={card.id} className="p-0 border-0">
                                <div className="card"
                                     onClick={() => {
                                         setSelectedCard(card);
                                         setShowModal(true);
                                     }}>
                                    <div className="card-body">
                                        <h5 className="card-title">{categoryId + "." + card.id}</h5>
                                        <p
                                            className="card-text"
                                            style={{
                                                display: '-webkit-box',
                                                WebkitLineClamp: 3,
                                                WebkitBoxOrient: 'vertical',
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'normal',
                                            }}
                                        >
                                            {card.description}
                                        </p>
                                        <Button
                                            variant="danger"
                                            size="sm"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleDeleteCard(card.id)
                                            }}
                                        >
                                            Удалить
                                        </Button>
                                    </div>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </div>
            </Collapse>
            <Button
                onClick={() => {
                    setShowModal(true);
                    setSelectedCard(null);
                }}
                className="btn btn-primary mb-2 w-100"
            >
                Добавить карточку
            </Button>

            <CategoryModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onSave={(card) => selectedCard ? handleEditCard(card) : handleAddCard(card)}
                card={selectedCard}
            />
            <h4
                onClick={() => setOpenSets(!openSets)}
                aria-controls="sets-collapse"
                aria-expanded={openSets}
                className="d-flex justify-content-between align-items-center cursor-pointer"
            >
                Наборы
                <Button variant="link" className="text-decoration-none">
                    {openSets ? '▲' : '▼'}
                </Button>
            </h4>


            <Collapse in={openSets}>
                <div id="sets-collapse">
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
                </div>
            </Collapse>
            <Button
                onClick={() => {
                    setShowSetModal(true);
                    setSelectedSet(null);
                }}
                className="btn btn-primary mb-2 w-100"
            >
                Добавить набор
            </Button>

            <SetModal
                show={showSetModal}
                onClose={() => setShowSetModal(false)}
                onSave={(set) => selectedSet ? handleEditSet(set) : handleAddSet(set)}
                set={selectedSet}
                cards={cards}
                categoryId={categoryId}
            />
            {/* Кнопка сохранения изменений */}
            <button onClick={handleUpdateCategory} className="btn btn-primary mt-3 w-100">
                Сохранить изменения
            </button>
            <button onClick={handleDeleteCategory} className="btn btn-outline-primary mt-3 w-100">
                Удалить
            </button>

        </div>
    );
}

export default CategoryPage;
