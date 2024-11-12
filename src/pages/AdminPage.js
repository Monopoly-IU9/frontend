import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPage() {
    const navigate = useNavigate();

    return (
        <div className="container my-4">
            <h1>Панель администратора</h1>
            <button className="btn btn-primary" onClick={() => navigate('/admin/categories')}>Управление категориями</button>
            <button className="btn btn-secondary my-2" onClick={() => navigate('/admin/new-game')}>Создать новый шаблон игры</button>

            <h2>Шаблоны игр</h2>
            <ul className="list-group">
                <li className="list-group-item d-flex justify-content-between">
                    Шаблон игры 1
                    <button className="btn btn-sm btn-outline-primary" onClick={() => navigate('/admin/edit-game?id=1')}>Edit</button>
                </li>
            </ul>
        </div>
    );
}

export default AdminPage;
