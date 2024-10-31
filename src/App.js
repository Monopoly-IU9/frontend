import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginAdminPage from './pages/LoginAdminPage';
import AdminPage from './pages/AdminPage';
import LoginHostPage from './pages/LoginHostPage';
import HostPage from './pages/HostPage';
import GamePage from './pages/GamePage';
import CustomNavbar from "./components/Navbar";
import AdminCategories from './pages/CategoriesPage';
import NewCategory from './pages/NewCategoryPage';
import CategoryPage from './pages/CategoryPage';
import NewGameTemplate from './pages/NewGameTemplatePage';
import EditGameTemplate from './pages/EditGameTemplatePage';

function App() {
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [isHostAuthenticated, setIsHostAuthenticated] = useState(false);

    return (
        <Router>
            <CustomNavbar />
            <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<HomePage />} />
                <Route
                    path="/admin-login"
                    element={<LoginAdminPage setIsAdminAuthenticated={setIsAdminAuthenticated} />}
                />
                <Route path="/admin" element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/categories" element={isAdminAuthenticated ? <AdminCategories /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/new-category" element={isAdminAuthenticated ? <NewCategory /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/category" element={isAdminAuthenticated ? <CategoryPage /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/new-game" element={isAdminAuthenticated ? <NewGameTemplate /> : <Navigate to="/admin-login" />} />
                <Route path="/admin/edit-game" element={isAdminAuthenticated ? <EditGameTemplate /> : <Navigate to="/admin-login" />} />
                <Route
                    path="/login-host"
                    element={<LoginHostPage setIsHostAuthenticated={setIsHostAuthenticated} />}
                />
                <Route
                    path="/host/settings"
                    element={isHostAuthenticated ? <HostPage /> : <Navigate to="/login-host" />}
                />
                <Route path="/game" element={<GamePage />} />
            </Routes>
        </Router>
    );
}

export default App;
