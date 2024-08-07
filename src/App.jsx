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
  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    themeChange(false);
    // Initialize user roles from cookies
    const rolesString = Cookies.get('roles');
    const roles = rolesString ? JSON.parse(rolesString) : [];
    setUserRoles(roles);
  }, []);

  return (
    <Router>
      <div>
        <Toaster />
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route
              path="/dashboard-admin/*"
              element={userRoles.includes('admin') ? <Layout /> : <Navigate to="/login" replace />}
            />
            <Route
              path="/dashboard-siswa/*"
              element={userRoles.includes('siswa') ? <Layout /> : <Navigate to="/login" replace />}
            />
          </Routes>
        </Suspense>
      </div>
    </Router>
  );
}

export default App;
