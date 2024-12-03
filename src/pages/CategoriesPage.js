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
        <div className="container bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="text-decoration-none d-flex align-items-center mb-3" style={{ color: '#0d6efd' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Главная
            </Link>

            <div className="d-flex justify-content-between align-items-center mb-3 mt-1">
                <h2>Категории</h2>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate('/admin/new-category')}
                >
                    +
                </button>
            </div>
            {loading ? (
                <p>Загрузка категорий...</p>
            ) : (
                <ul className="list-group">
                    {categories.map((category) => (
                        <li
                            key={category.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onClick={() => navigate(`/admin/category?id=${category.id}`)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default CategoriesPage;
