import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginAdminPage from './pages/LoginAdminPage';
import AdminPage from './pages/AdminPage';
import LoginHostPage from './pages/LoginHostPage';
import HostPage from './pages/HostPage';
import GamePage from './pages/GamePage';
import CustomNavbar from './components/Navbar';
import AdminCategories from './pages/CategoriesPage';
import NewCategory from './pages/NewCategoryPage';
import CategoryPage from './pages/CategoryPage';
import NewGameTemplate from './pages/NewGameTemplatePage';
import EditGameTemplate from './pages/EditGameTemplatePage';
import GameSettingsPage from './pages/GameSettingsPage';
import {checkAdminAuth, checkHostAuth} from "./api/AuthAPI";

function App() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [isHostAuthenticated, setIsHostAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            setIsLoading(true);

            const adminToken = localStorage.getItem('adminToken');
            const hostToken = localStorage.getItem('hostToken');

            const adminPromise = adminToken
                ? checkAdminAuth().then(() => setIsAdminAuthenticated(true)).catch(() => {
                    localStorage.removeItem('adminToken');
                    setIsAdminAuthenticated(false);
                })
                : Promise.resolve();

            const hostPromise = hostToken
                ? checkHostAuth().then(() => setIsHostAuthenticated(true)).catch(() => {
                    localStorage.removeItem('hostToken');
                    setIsHostAuthenticated(false);
                })
                : Promise.resolve();

            await Promise.all([adminPromise, hostPromise]);
            setIsLoading(false);
        };

        checkAuth();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>; // Показываем индикатор загрузки
    }

    return (
        <Router>
            <CustomNavbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="*" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />

                {/* Администраторские маршруты */}
                <Route
                    path="/admin-login"
                    element={<LoginAdminPage setIsAdminAuthenticated={setIsAdminAuthenticated} />}
                />
                <Route
                    path="/admin"
                    element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />}
                />
                <Route
                    path="/admin/categories"
                    element={isAdminAuthenticated ? <AdminCategories /> : <Navigate to="/admin-login" />}
                />
                <Route
                    path="/admin/new-category"
                    element={isAdminAuthenticated ? <NewCategory /> : <Navigate to="/admin-login" />}
                />
                <Route
                    path="/admin/category"
                    element={isAdminAuthenticated ? <CategoryPage /> : <Navigate to="/admin-login" />}
                />
                <Route
                    path="/admin/new-game"
                    element={isAdminAuthenticated ? <NewGameTemplate /> : <Navigate to="/admin-login" />}
                />
                <Route
                    path="/admin/edit-game"
                    element={isAdminAuthenticated ? <EditGameTemplate /> : <Navigate to="/admin-login" />}
                />

                {/* Ведущие и игры */}
                <Route
                    path="/login"
                    element={!isHostAuthenticated ? <LoginHostPage setIsHostAuthenticated={setIsHostAuthenticated} /> : <Navigate to="/games" />}
                />
                <Route
                    path="/games"
                    element={isHostAuthenticated ? <HostPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/game-settings"
                    element={isHostAuthenticated ? <GameSettingsPage /> : <Navigate to="/login" />}
                />
                <Route
                    path="/game"
                    element={<GamePage isHost={isHostAuthenticated} />}
                />
            </Routes>
        </Router>
    );
}

export default App;
