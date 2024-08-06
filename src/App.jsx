// src/App.jsx
import React, { lazy, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { themeChange } from 'theme-change';

const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));
const Documentation = lazy(() => import('./pages/Documentation'));

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/documentation" element={<Documentation />} />
        <Route path="/dashboard-admin/*" element={<Layout />} /> 
        <Route path="*" element={<Navigate to="/login" replace />} /> 
      </Routes>
    </Router>
  );
}

export default App;
