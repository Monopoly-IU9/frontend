import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { adminGetGames } from "../api/GameAPI";

function AdminPage() {
    // Состояние для хранения игр
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    // Навигатор для перехода по страницам
    const navigate = useNavigate();

    // Загрузка категорий при монтировании компонента
    useEffect(() => {
        const fetchGames = async () => {
            try {
                const data = await adminGetGames();
                setGames(data);
            } catch (error) {
                console.error('Ошибка при загрузке категорий:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchGames();
    }, []);


    return (
        <div className="container bg-light rounded p-4 shadow-sm">
            <div className="d-flex flex-column gap-3">
                <button className="btn btn-outline-primary" onClick={() => navigate('/admin/categories')}>
                    Категории
                </button>
                <button className="btn btn-primary" onClick={() => navigate('/admin/hosts')}>
                    Ведущие
                </button>
            </div>

            <div className="d-flex justify-content-between align-items-center mb-3 mt-3">
                <h2>Игры</h2>
                <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={() => navigate('/admin/new-game')}
                >
                    +
                </button>
            </div>
            {loading ? (
                <p>Загрузка игр...</p>
            ) : (
                <ul className="list-group">
                    {games.map((category) => (
                        <li
                            key={category.id}
                            className="list-group-item d-flex justify-content-between align-items-center"
                            onClick={() => navigate(`/admin/edit-game?id=${category.id}`)}
                        >
                            {category.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default AdminPage;
