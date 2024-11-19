import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {getCategories} from '../api/CategoriesAPI';

function CategoriesPage() {
    // Состояние для хранения категорий
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    // Навигатор для перехода по страницам
    const navigate = useNavigate();

    // Загрузка категорий при монтировании компонента
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const data = await getCategories();
                setCategories(data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategories();
    }, []);

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Категории</h1>

            <div className="d-flex flex-column gap-3">
                <button
                    className="btn btn-primary mb-4"
                    onClick={() => navigate('/admin/new-category')}
                >
                    Создать новую категорию
                </button>
            </div>

            <h2>Существующие категории</h2>
            {loading ? (
                <p>Загрузка категорий...</p>
            ) : (
                <ul className="list-group">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                        >

                                <button
                                    className="btn"
                                    style={{
                                        backgroundColor: `#${category.color}`,
                                        color: '#000000',
                                    }}
                                    onClick={() => navigate(`/admin/category?id=${category.id}`)}
                                >
                                    {category.name}
                                </button>

                            <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() => navigate(`/admin/category?id=${category.id}`)}
                            >
                                Изменить
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoriesPage;
