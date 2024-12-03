import React from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function AdminPage() {
    // Навигатор для перехода по страницам
    const navigate = useNavigate();

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <div className="d-flex flex-column gap-3">
                <button className="btn btn-outline-primary" onClick={() => navigate('/admin/categories')}>
                    Категории
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/admin/hosts')}>
                    Ведущие
                </button>
            </div>

            {/* Контент вкладок */}
            <div className="tab-content" id="adminTabContent">
                <div
                    className="tab-pane fade"
                    id="categories"
                    role="tabpanel"
                    aria-labelledby="categories-tab"
                >
                    <p>Контент для управления категориями.</p>
                </div>
                <div
                    className="tab-pane fade show active"
                    id="hosts"
                    role="tabpanel"
                    aria-labelledby="hosts-tab"
                >

                    <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                        <h2>Игры</h2>
                        <button
                            className="btn btn-outline-primary btn-sm"
                            onClick={() => navigate('/admin/new-game')}
                        >
                            +
                        </button>
                    </div>
                    <ul className="list-group">
                        {Array.from({length: 10}).map((_, index) => (
                            <li
                                key={index}
                                className="list-group-item d-flex justify-content-between align-items-center"
                                onClick={() => navigate('/admin/edit-game?id=1')}
                            >
                                Лукойл
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default AdminPage;
