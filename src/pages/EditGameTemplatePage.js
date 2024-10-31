import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';

function EditGameTemplate() {
    const [searchParams] = useSearchParams();
    const gameId = searchParams.get('id');

    // State для полей формы
    const [gameName, setGameName] = useState('');
    const [categories, setCategories] = useState([]);
    const [sets, setSets] = useState([]);
    const [tags, setTags] = useState([]);
    const [hostLogin, setHostLogin] = useState('');
    const [hostPassword, setHostPassword] = useState('');

    useEffect(() => {
        // Получение данных игры для редактирования по `gameId`
        const fetchGameData = async () => {
            setGameName('Sample Game');
            setCategories(['Category 1']);
            setSets(['Set 1']);
            setTags(['Tag 1']);
            setHostLogin('sampleHost');
            setHostPassword('samplePassword');
        };
        fetchGameData().then();
    }, [gameId]);

    const handleUpdateGame = () => {
        console.log({
            gameId, gameName, categories, sets, tags, hostLogin, hostPassword
        });
    };

    const handleDeleteGame = () => {
        console.log(`Delete Game with ID: ${gameId}`);
    };

    return (
        <div className="container my-4">
            <h1>Edit Game Template</h1>
            <div className="mb-3">
                <label className="form-label">Game Name</label>
                <input
                    type="text"
                    className="form-control"
                    value={gameName}
                    onChange={(e) => setGameName(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Categories</label>
                <div>
                    <input type="checkbox" checked={categories.includes('Category 1')} onChange={() => setCategories([...categories, 'Category 1'])} /> Category 1
                    <input type="checkbox" checked={categories.includes('Category 2')} onChange={() => setCategories([...categories, 'Category 2'])} /> Category 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Sets</label>
                <div>
                    <input type="checkbox" checked={sets.includes('Set 1')} onChange={() => setSets([...sets, 'Set 1'])} /> Set 1
                    <input type="checkbox" checked={sets.includes('Set 2')} onChange={() => setSets([...sets, 'Set 2'])} /> Set 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Tags</label>
                <div>
                    <input type="checkbox" checked={tags.includes('Tag 1')} onChange={() => setTags([...tags, 'Tag 1'])} /> Tag 1
                    <input type="checkbox" checked={tags.includes('Tag 2')} onChange={() => setTags([...tags, 'Tag 2'])} /> Tag 2
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label">Host Login</label>
                <input
                    type="text"
                    className="form-control"
                    value={hostLogin}
                    onChange={(e) => setHostLogin(e.target.value)}
                />
            </div>

            <div className="mb-3">
                <label className="form-label">Host Password</label>
                <input
                    type="password"
                    className="form-control"
                    value={hostPassword}
                    onChange={(e) => setHostPassword(e.target.value)}
                />
            </div>

            <button className="btn btn-primary" onClick={handleUpdateGame}>Update Game</button>
            <button className="btn btn-danger ms-2" onClick={handleDeleteGame}>Delete Game</button>
        </div>
    );
}

export default EditGameTemplate;
