import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPage() {
    // Навигатор для перехода по страницам
    const navigate = useNavigate();

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <h1 className="mb-4">Панель администратора</h1>
            <div className="d-flex flex-column gap-3">
                <button className="btn btn-primary" onClick={() => navigate('/admin/categories')}>
                    Управление категориями
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/admin/hosts')}>
                    Управление ведущими
                </button>
                <button className="btn btn-secondary" onClick={() => navigate('/admin/new-game')}>
                    Создать новый шаблон игры
                </button>
            </div>
            <h2 className="mt-5">Шаблоны игр</h2>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between align-items-center">
                    Шаблон игры 1
                    <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/admin/edit-game?id=1')}>
                        Изменить
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default AdminPage;
