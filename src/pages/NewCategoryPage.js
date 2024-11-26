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
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin/categories" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Создать новую категорию</h1>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={handleCreateCategory}>
                <div className="mb-3">
                    <label className="form-label">Имя категории</label>
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
                    <label className="form-label">Цвет категории</label>
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
