import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';

function EditGameTemplate() {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('id');
    const navigate = useNavigate();

    const [gameName, setGameName] = useState('');
    const [categories, setCategories] = useState([]);
    const [sets, setSets] = useState([]);
    const [tags, setTags] = useState([]);

    // Захардкоженные данные для симуляции
    const allCategories = [
        { id: 1, name: 'Category 1', color: 'blue' },
        { id: 2, name: 'Category 2', color: 'green' }
    ];
    const allSets = [
        { id: 1, name: 'Все карточки', categoryId: 1 },
        { id: 2, name: 'Набор 1', categoryId: 1 },
        { id: 3, name: 'Все карточки', categoryId: 2 },
        { id: 4, name: 'Набор 2', categoryId: 2 }
    ];
    const allTags = ['Хэштег 1', 'Хэштег 2'];

    // Инициализация данных
    useEffect(() => {
        setGameName('Sample Game');
        setCategories([]); // Изначально категории пусты
        setSets([]); // Изначально наборы пусты
        setTags(allTags); // Изначально выбираем все теги
    }, [gameId]);

    // Обновление выбора категории
    const toggleCategory = (categoryId) => {
        setCategories((prevCategories) =>
            prevCategories.includes(categoryId)
                ? prevCategories.filter((id) => id !== categoryId)
                : [...prevCategories, categoryId]
        );
    };

    // Обновление выбора набора
    const toggleSet = (setId) => {
        setSets((prevSets) =>
            prevSets.includes(setId)
                ? prevSets.filter((id) => id !== setId)
                : [...prevSets, setId]
        );
    };

    // Обновление выбора тегов
    const toggleTag = (tag) => {
        setTags((prevTags) =>
            prevTags.includes(tag) ? prevTags.filter((t) => t !== tag) : [...prevTags, tag]
        );
    };

    // Фильтрация наборов на основе выбранных категорий
    const filteredSets = allSets.filter((set) => categories.includes(set.categoryId));

    const handleUpdateGame = (e) => {
        e.preventDefault();
        navigate('/admin');
    };

    const handleDeleteGame = (e) => {
        e.preventDefault();
        navigate('/admin');
    };

    return (
        <div className="container bg-light rounded p-4 shadow-sm">
            <Link
                to="/admin"
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
                Главная
            </Link>
            <h2>Изменить шаблон игры</h2>

            <div className="mb-3">
                <label className="form-label">Название</label>
                <input
                    type="text"
                    className="form-control"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Категории</label>
                <div>
                    {allCategories.map((category) => (
                        <div key={category.id}>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`category-${category.id}`}
                                    checked={categories.includes(category.id)}
                                    onChange={() => toggleCategory(category.id)}
                                />
                                <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                    {category.name}
                                </label>
                            </div>
                            {categories.includes(category.id) && (
                                <div className="ms-4">
                                    {allSets
                                        .filter((set) => set.categoryId === category.id)
                                        .map((set) => (
                                            <div className="form-check" key={set.id}>
                                                <input
                                                    type="checkbox"
                                                    className="form-check-input"
                                                    id={`set-${set.id}`}
                                                    checked={sets.includes(set.id)}
                                                    onChange={() => toggleSet(set.id)}
                                                />
                                                <label
                                                    className="form-check-label"
                                                    htmlFor={`set-${set.id}`}
                                                >
                                                    {set.name}
                                                </label>
                                            </div>
                                        ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Теги</label>
                <div>
                    {allTags.map((tag, index) => (
                        <div className="form-check" key={index}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`tag-${index}`}
                                checked={tags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                            />
                            <label className="form-check-label" htmlFor={`tag-${index}`}>
                                {tag}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <button
                onClick={handleUpdateGame}
                className="btn btn-primary mt-3 w-100"
            >
                Сохранить изменения
            </button>
            <button
                onClick={handleDeleteGame}
                className="btn btn-outline-primary mt-3 w-100"
            >
                Удалить игру
            </button>
        </div>
    );
}

export default EditGameTemplate;
