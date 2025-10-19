import React from 'react';
import { Link } from 'react-router-dom';

export default function Navbar({ user, onLogout, onThemeToggle }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="logo"></span>
        <span>Foundify ✨</span>
      </div>
      <div className="nav-links">
        <Link to="/">Home</Link>
        {user ? (
          <>
            <Link to="/messages">Messages</Link>
            {user.role === 'admin' && <Link to="/admin">Admin</Link>}
            <button className="btn secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Sign up</Link>
          </>
        )}
        <button className="theme-toggle" onClick={onThemeToggle}>🌓</button>
      </div>
    </nav>
  );
}
