import React, {useState, useEffect} from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Dashboard from './pages/Dashboard'
import AdminDashboard from './pages/AdminDashboard'
import Messages from './pages/Messages'

export default function App(){
  const [user, setUser] = useState(null)
  const navigate = useNavigate()
  useEffect(()=>{
    const t = localStorage.getItem('foundify_token'); const u = localStorage.getItem('foundify_user')
    if(t && u) setUser(JSON.parse(u))
    const theme = localStorage.getItem('foundify_theme') || 'light'
    if(theme==='dark') document.documentElement.setAttribute('data-theme','dark')
  },[])

  function onLogout(){ localStorage.removeItem('foundify_token'); localStorage.removeItem('foundify_user'); setUser(null); navigate('/login') }

  return (
    <div>
      <Navbar user={user} onLogout={onLogout} onThemeToggle={() => {
        if(document.documentElement.getAttribute('data-theme')==='dark') { document.documentElement.removeAttribute('data-theme'); localStorage.setItem('foundify_theme','light') }
        else { document.documentElement.setAttribute('data-theme','dark'); localStorage.setItem('foundify_theme','dark') }
      }} />
      <main className="container-md p-4">
        <Routes>
          <Route path="/" element={<Dashboard user={user} />} />
          <Route path="/login" element={<Login onAuth={(u,token)=>{ localStorage.setItem('foundify_token', token); localStorage.setItem('foundify_user', JSON.stringify(u)); setUser(u); }} />} />
          <Route path="/signup" element={<Signup onAuth={(u,token)=>{ localStorage.setItem('foundify_token', token); localStorage.setItem('foundify_user', JSON.stringify(u)); setUser(u); }} />} />
          <Route path="/admin" element={<AdminDashboard user={user} />} />
          <Route path="/messages" element={<Messages user={user} />} />
        </Routes>
      </main>
    </div>
  )
}
