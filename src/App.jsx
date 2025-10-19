import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import AdminDashboard from './pages/AdminDashboard';
import Messages from './pages/Messages';
import ReportItem from './pages/ReportItem';

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('foundify_token');
    const userData = localStorage.getItem('foundify_user');
    if (token && userData) setUser(JSON.parse(userData));

    const theme = localStorage.getItem('foundify_theme') || 'light';
    if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');

    const timeout = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timeout);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('foundify_token');
    localStorage.removeItem('foundify_user');
    setUser(null);
    navigate('/login');
  };

  const handleAuth = (userData, token) => {
    localStorage.setItem('foundify_token', token);
    localStorage.setItem('foundify_user', JSON.stringify(userData));
    setUser(userData);
    
    // Redirect based on role
    if (userData.role === 'admin') {
      navigate('/admin');
    } else {
      navigate('/dashboard');
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading <strong>Foundify ✨</strong>...</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar
        user={user}
        onLogout={handleLogout}
        onThemeToggle={() => {
          document.body.classList.add('theme-fade');
          const theme = document.documentElement.getAttribute('data-theme');
          if (theme === 'dark') {
            document.documentElement.removeAttribute('data-theme');
            localStorage.setItem('foundify_theme', 'light');
          } else {
            document.documentElement.setAttribute('data-theme', 'dark');
            localStorage.setItem('foundify_theme', 'dark');
          }
          setTimeout(() => document.body.classList.remove('theme-fade'), 400);
        }}
      />

      <main className="container p-4">
        <Routes>
          {/* Public routes - redirect to dashboard if already logged in */}
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/login" 
            element={user ? <Navigate to="/dashboard" /> : <Login onAuth={handleAuth} />} 
          />
          <Route 
            path="/signup" 
            element={user ? <Navigate to="/dashboard" /> : <Signup onAuth={handleAuth} />} 
          />
          
          {/* Protected routes - require login */}
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/report" 
            element={user ? <ReportItem user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/messages" 
            element={user ? <Messages user={user} /> : <Navigate to="/login" />} 
          />
          <Route 
            path="/admin" 
            element={
              user?.role === 'admin' ? (
                <AdminDashboard user={user} />
              ) : (
                <Navigate to="/login" />
              )
            } 
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}
