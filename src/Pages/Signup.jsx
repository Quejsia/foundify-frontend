import React, {useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const API = import.meta.env.VITE_API_URL || 'https://foundify-backend-12.onrender.com'
export default function Signup({onAuth}){
  const [name,setName]=useState(''), [email,setEmail]=useState(''), [password,setPassword]=useState(''), [err,setErr]=useState('')
  const nav = useNavigate()
  async function submit(e){ e.preventDefault(); setErr('')
    try{
      const res = await axios.post(API + '/api/auth/signup', { name, email, password })
      onAuth(res.data.user, res.data.token)
      nav('/')
    }catch(err){ setErr(err?.response?.data?.error || 'Signup failed') }
  }
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-3">Signup</h2>
      {err && <div className="text-red-600 mb-2">{err}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full p-3 border rounded" placeholder="Full name" value={name} onChange={e=>setName(e.target.value)} />
        <input className="w-full p-3 border rounded" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="w-full p-3 border rounded" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-emerald-600 text-white rounded">Create account</button>
        </div>
      </form>
    </div>
  )
}
