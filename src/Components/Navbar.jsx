import React, { useState } from "react";

export default function Navbar({ user, onLogout, onThemeToggle }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="bg-sky-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-wide">Foundify ✨</h1>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={onThemeToggle}
            className="bg-white text-sky-600 px-3 py-1 rounded-md font-medium hover:bg-sky-100 transition"
          >
            🌓
          </button>
          {user ? (
            <>
              <span className="font-medium">{user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-white text-sky-600 px-3 py-1 rounded-md font-medium hover:bg-sky-100"
            >
              Login
            </a>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden p-2 rounded bg-sky-700 hover:bg-sky-500"
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-sky-700 text-white flex flex-col items-center gap-2 pb-3">
          <button
            onClick={onThemeToggle}
            className="bg-white text-sky-600 px-3 py-1 rounded-md font-medium hover:bg-sky-100 transition"
          >
            🌓 Toggle Theme
          </button>
          {user ? (
            <>
              <span className="font-medium">{user.name}</span>
              <button
                onClick={onLogout}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md font-medium"
              >
                Logout
              </button>
            </>
          ) : (
            <a
              href="/login"
              className="bg-white text-sky-600 px-3 py-1 rounded-md font-medium hover:bg-sky-100"
            >
              Login
            </a>
          )}
        </div>
      )}
    </nav>
  );
}
