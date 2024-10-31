import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginAdminPage from './pages/LoginAdminPage';
import AdminPage from './pages/AdminPage';
import LoginHostPage from './pages/LoginHostPage';
import HostPage from './pages/HostPage';
import GamePage from './pages/GamePage';
import CustomNavbar from "./components/Navbar";

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
                    path="/login-admin"
                    element={<LoginAdminPage setIsAdminAuthenticated={setIsAdminAuthenticated} />}
                />
                <Route
                    path="/admin"
                    element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/login-admin" />}
                />
                <Route path="/admin/create" element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/login-admin" />} />
                <Route
                    path="/admin/edit"
                    element={isAdminAuthenticated ? <AdminPage /> : <Navigate to="/login-admin" />}
                />
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
