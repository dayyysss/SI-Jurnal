import React, { lazy, useEffect, Suspense, useState } from 'react';
import './App.css';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { themeChange } from 'theme-change';
import Cookies from 'js-cookie';

const Layout = lazy(() => import('./containers/Layout'));
const Login = lazy(() => import('./pages/Login'));
const ForgotPassword = lazy(() => import('./pages/ForgotPassword'));

function App() {

  useEffect(() => {
    themeChange(false);
  }, []);

  const ProtectedRoute = ({ children, role }) => {
    const roles = JSON.parse(Cookies.get("roles") || "[]");
    if (!roles.includes(role)) {
      return <Navigate to="/" replace />;
    }
    return children;
  };

  return (
    <Router>
      <div>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/dashboard-admin/*" element={<ProtectedRoute role="admin"><Layout /></ProtectedRoute>} />
            <Route path="/dashboard-siswa/*" element={<ProtectedRoute role="siswa"><Layout /></ProtectedRoute>} />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
