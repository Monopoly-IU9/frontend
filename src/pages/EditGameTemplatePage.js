import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { getGameInfo, editGame } from '../api/GameAPI';

function EditGameTemplate() {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('id');
    const navigate = useNavigate();

    const [gameName, setGameName] = useState('');
    const [categories, setCategories] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [selectedSets, setSelectedSets] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        if (gameId) {
            // Получение данных о шаблоне игры
            getGameInfo(gameId)
                .then((data) => {
                    setGameName(data.name);
                    setCategories(data.categories);
                    setTags(data.hashtags);
                    setSelectedCategories(
                        data.categories.filter((cat) => cat.in_game).map((cat) => cat.id)
                    );
                    setSelectedSets(
                        data.categories
                            .flatMap((cat) =>
                                cat.sets.filter((set) => set.in_category).map((set) => set.id)
                            )
                    );
                    setSelectedTags(data.hashtags.filter((tag) => tag.in_game).map((tag) => tag.name));
                })
                .catch((error) => {
                    console.error('Ошибка загрузки данных:', error);
                    alert('Не удалось загрузить данные игры');
                });
        }
    }, [gameId]);

    // Обновление выбора категории
    const toggleCategory = (categoryId) => {
        setSelectedCategories((prevCategories) => {
            if (prevCategories.includes(categoryId)) {
                // Убираем категорию и её наборы
                const updatedCategories = prevCategories.filter((id) => id !== categoryId);
                const updatedSets = selectedSets.filter(
                    (setId) =>
                        !categories
                            .find((category) => category.id === categoryId)
                            .sets.map((set) => set.id)
                            .includes(setId)
                );
                setSelectedSets(updatedSets);
                return updatedCategories;
            } else {
                // Добавляем категорию
                return [...prevCategories, categoryId];
            }
        });
    };

    // Обновление выбора набора
    const toggleSet = (setId) => {
        setSelectedSets((prevSets) =>
            prevSets.includes(setId) ? prevSets.filter((id) => id !== setId) : [...prevSets, setId]
        );
    };

    const toggleTag = (tagName) => {
        setSelectedTags((prev) =>
            prev.includes(tagName)
                ? prev.filter((tag) => tag !== tagName)
                : [...prev, tagName]
        );
    };

    const handleUpdateGame = async (e) => {
        e.preventDefault();
        try {
            await editGame(gameId, gameName, selectedSets, selectedCategories);
            navigate('/admin');
        } catch (error) {
            console.error('Ошибка сохранения игры:', error);
            alert('Не удалось сохранить изменения');
        }
    };

    const handleDeleteGame = (e) => {
        e.preventDefault();
        // Логика удаления игры (при необходимости можно добавить API-ручку)
        alert('Игра удалена');
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
                    {categories.map((category) => (
                        <div key={category.id}>
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    className="form-check-input"
                                    id={`category-${category.id}`}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => toggleCategory(category.id)}
                                />
                                <label className="form-check-label" htmlFor={`category-${category.id}`}>
                                    {category.name}
                                </label>
                            </div>
                            {selectedCategories.includes(category.id) && (
                                <div className="ms-4">
                                    {category.sets.map((set) => (
                                        <div className="form-check" key={set.id}>
                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                id={`set-${set.id}`}
                                                checked={selectedSets.includes(set.id)}
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
                    {tags.map((tag, index) => (
                        <div className="form-check" key={index}>
                            <input
                                type="checkbox"
                                className="form-check-input"
                                id={`tag-${index}`}
                                checked={selectedTags.includes(tag.name)}
                                onChange={() => toggleTag(tag.name)}
                            />
                            <label className="form-check-label" htmlFor={`tag-${index}`}>
                                {tag.name}
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
