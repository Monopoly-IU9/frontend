import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from 'react-bootstrap';

function EditGameTemplate() {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('id');
    const navigate = useNavigate();

    const [gameName, setGameName] = useState('');
    const [categories, setCategories] = useState([]);
    const [sets, setSets] = useState([]);
    const [tags, setTags] = useState([]);
    const [hostLogin, setHostLogin] = useState('');
    const [hostPassword, setHostPassword] = useState('');

    useEffect(() => {
        const fetchGameData = async () => {
            setGameName('Sample Game');
            setCategories(['Category 1']);
            setSets(['Set 1']);
            setTags(['Tag 1']);
            setHostLogin('sampleHost');
            setHostPassword('samplePassword');
        };
        fetchGameData();
    }, [gameId]);

    const handleUpdateGame = (e) => {
        e.preventDefault();
        navigate('/admin');
    };

    const handleDeleteGame = (e) => {
        e.preventDefault();
        navigate('/admin');
    };

    return (
        <div className="container my-4 bg-light rounded p-4 shadow-sm">
            <Link to="/admin" className="btn btn-outline-secondary mb-3">Назад</Link>
            <h1 className="mb-4">Изменить шаблон игры</h1>

            <div className="mb-3">
                <label className="form-label">Название</label>
                <input type="text" className="form-control" value={gameName} onChange={(e) => setGameName(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Категории</label>
                <div>
                    <input type="checkbox" checked={categories.includes('Category 1')} onChange={() => setCategories([...categories, 'Category 1'])} /> Category 1
                    <input type="checkbox" checked={categories.includes('Category 2')} onChange={() => setCategories([...categories, 'Category 2'])} /> Category 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Наборы</label>
                <div>
                    <input type="checkbox" checked={sets.includes('Set 1')} onChange={() => setSets([...sets, 'Set 1'])} /> Set 1
                    <input type="checkbox" checked={sets.includes('Set 2')} onChange={() => setSets([...sets, 'Set 2'])} /> Set 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Теги</label>
                <div>
                    <input type="checkbox" checked={tags.includes('Tag 1')} onChange={() => setTags([...tags, 'Tag 1'])} /> Tag 1
                    <input type="checkbox" checked={tags.includes('Tag 2')} onChange={() => setTags([...tags, 'Tag 2'])} /> Tag 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Логин ведущего</label>
                <input type="text" className="form-control" value={hostLogin} onChange={(e) => setHostLogin(e.target.value)} />
            </div>

            <div className="mb-3">
                <label className="form-label">Пароль ведущего</label>
                <input type="password" className="form-control" value={hostPassword} onChange={(e) => setHostPassword(e.target.value)} />
            </div>

            <Button onClick={handleUpdateGame} className="btn btn-success">Сохранить изменения</Button>
            <Button onClick={handleDeleteGame} className="btn btn-danger ms-2">Удалить игру</Button>
        </div>
    );
}

export default EditGameTemplate;
