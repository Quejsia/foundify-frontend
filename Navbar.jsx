import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
export default function Navbar({user, onLogout, onThemeToggle}){
  const nav = useNavigate()
  return (
    <header className="bg-gradient-to-r from-sky-600 to-emerald-500 text-white p-3">
      <div className="flex items-center justify-between container-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">🔎</div>
          <div>
            <div className="font-bold text-lg">Foundify ✨</div>
            <div className="text-xs text-white/80">Lost & Found</div>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={onThemeToggle} className="px-3 py-1 bg-white/20 rounded">Toggle</button>
          {user ? (
            <div className="flex items-center gap-2">
              <div className="text-sm">{user.name || user.email}</div>
              <button onClick={()=>{ onLogout(); nav('/login') }} className="px-3 py-1 bg-white/20 rounded">Logout</button>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="px-3 py-1 bg-white/20 rounded">Login</Link>
              <Link to="/signup" className="px-3 py-1 border rounded">Signup</Link>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
