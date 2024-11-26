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
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Изменить шаблон игры</h1>

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
