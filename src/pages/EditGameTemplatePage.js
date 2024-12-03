import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

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
        { id: 1, name: 'Общий набор 1', categoryId: 1 },
        { id: 2, name: 'Набор 1', categoryId: 1 },
        { id: 3, name: 'Общий набор 2', categoryId: 2 },
        { id: 4, name: 'Набор 2', categoryId: 2 }
    ];
    const allTags = ['Tag 1', 'Tag 2'];

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
            <Link to="/admin" className="text-decoration-none d-flex align-items-center mb-3" style={{ color: '#0d6efd' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
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
                            <input
                                type="checkbox"
                                checked={categories.includes(category.id)}
                                onChange={() => toggleCategory(category.id)}
                            />{' '}
                            {category.name}
                        </div>
                    ))}
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Наборы</label>
                <div>
                    {filteredSets.length > 0 ? (
                        filteredSets.map((set) => (
                            <div key={set.id}>
                                <input
                                    type="checkbox"
                                    checked={sets.includes(set.id)}
                                    onChange={() => toggleSet(set.id)}
                                />{' '}
                                {set.name}
                            </div>
                        ))
                    ) : (
                        <p>Нет доступных наборов для выбранных категорий.</p>
                    )}
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Теги</label>
                <div>
                    {allTags.map((tag) => (
                        <div key={tag}>
                            <input
                                type="checkbox"
                                checked={tags.includes(tag)}
                                onChange={() => toggleTag(tag)}
                            />{' '}
                            {tag}
                        </div>
                    ))}
                </div>
            </div>

            <Button onClick={handleUpdateGame} className="btn btn-success">Сохранить изменения</Button>
            <Button onClick={handleDeleteGame} className="btn btn-danger ms-2">Удалить игру</Button>
        </div>
    );
}

export default EditGameTemplate;
