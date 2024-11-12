import React, { useState } from 'react';

function NewGameTemplate() {
    const [gameName, setGameName] = useState('');
    const [categories, setCategories] = useState([]);
    const [sets, setSets] = useState([]);
    const [tags, setTags] = useState([]);
    const [hostLogin, setHostLogin] = useState('');
    const [hostPassword, setHostPassword] = useState('');

    const handleCreateGame = () => {
        console.log({
            gameName, categories, sets, tags, hostLogin, hostPassword
        });
    };

    return (
        <div className="container my-4">
            <h1>Создать новый шаблон игры</h1>
            <div className="mb-3">
                <label className="form-label">Имя игры</label>
                <input
                    type="text"
                    className="form-control"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Категории</label>
                <div>
                    <input type="checkbox" onChange={() => setCategories([...categories, 'Category 1'])} />
                    Category 1
                    <input type="checkbox" onChange={() => setCategories([...categories, 'Category 2'])} />
                    Category 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Стопки</label>
                <div>
                    <input type="checkbox" onChange={() => setSets([...sets, 'Set 1'])} /> Set 1
                    <input type="checkbox" onChange={() => setSets([...sets, 'Set 2'])} /> Set 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Теги</label>
                <div>
                    <input type="checkbox" onChange={() => setTags([...tags, 'Tag 1'])} /> Tag 1
                    <input type="checkbox" onChange={() => setTags([...tags, 'Tag 2'])} /> Tag 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Login ведущего</label>
                <input
                    type="text"
                    className="form-control"
                    value={hostLogin}
                    onChange={(e) => setHostLogin(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Password ведущего</label>
                <input
                    type="password"
                    className="form-control"
                    value={hostPassword}
                    onChange={(e) => setHostPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={handleCreateGame}>Создать игру</button>
        </div>
    );
}

export default NewGameTemplate;
