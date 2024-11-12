import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function CategoriesPage() {
    const navigate = useNavigate();

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Категории</h1>
            <button className="btn btn-primary mb-4" onClick={() => navigate('/admin/new-category')}>
                Создать новую категорию
            </button>

            <h2>Существующие категории</h2>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Категория 1
                    <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/admin/category?id=1')}>
                        Изменить
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default CategoriesPage;
