import React from 'react';

export default function Navbar({ user, onLogout, onThemeToggle }) {
  return (
    <nav className="navbar">
      <div className="brand">
        <span className="logo"></span>
        <span>Foundify ✨</span>
      </div>
      <div className="nav-links">
        <a href="/">Home</a>
        {user ? (
          <>
            <a href="/messages">Messages</a>
            {user.role === 'admin' && <a href="/admin">Admin</a>}
            <button className="btn secondary" onClick={onLogout}>Logout</button>
          </>
        ) : (
          <>
            <a href="/login">Login</a>
            <a href="/signup">Sign up</a>
          </>
        )}
        <button className="theme-toggle" onClick={onThemeToggle}>🌓</button>
      </div>
    </nav>
  );
}
