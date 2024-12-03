import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { createCategory } from '../api/CategoriesAPI';

function NewCategoryPage() {
    const [name, setName] = useState('');
    const [color, setColor] = useState('#0000FF');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Обработка создания категории
    const handleCreateCategory = async (e) => {
        e.preventDefault();
        setError(''); // Очистка ошибок перед началом запроса

        if (!name.trim()) {
            setError('Имя категории не может быть пустым.');
            return;
        }

        try {
            await createCategory(name, color.replace('#', '')); // Удаляем символ "#" из цвета перед отправкой
            navigate('/admin/categories'); // Переход обратно к списку категорий после успешного создания
        } catch (err) {
            console.error('Ошибка при создании категории:', err);
            setError('Не удалось создать категорию. Попробуйте позже.');
        }
    };

    return (
        <div className="container bg-light rounded p-4 shadow-sm">
            <Link to="/admin/categories" className="text-decoration-none d-flex align-items-center mb-3" style={{ color: '#0d6efd' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left me-1" viewBox="0 0 16 16">
                    <path fillRule="evenodd" d="M15 8a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 0 1 .708.708L2.707 7.5H14.5A.5.5 0 0 1 15 8z"/>
                </svg>
                Категории
            </Link>
            <h1 className="mb-4">Новая категория</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleCreateCategory}>
                <div className="mb-3">
                    <label className="form-label">Имя</label>
                    <input
                        type="text"
                        className="form-control"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Введите имя категории"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Цвет</label>
                    <input
                        type="color"
                        className="form-control form-control-color"
                        value={color}
                        onChange={(e) => setColor(e.target.value)}
                    />
                </div>
                <Button type="submit" className="btn btn-primary">Создать категорию</Button>
            </form>
        </div>
    );
}

export default NewCategoryPage;
