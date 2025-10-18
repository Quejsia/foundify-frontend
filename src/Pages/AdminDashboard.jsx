import React, {useEffect, useState} from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL || 'https://foundify-backend-12.onrender.com'
export default function AdminDashboard({user}){
  const [items,setItems]=useState([])
  useEffect(()=>{ load() },[])
  async function load(){ try{ const res = await axios.get(API + '/api/items'); setItems(res.data) }catch(e){ console.error(e) } }
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-semibold mb-4">Owner Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Messages from claimers</h3>
          <div className="text-sm small-muted">Claim messages will appear here (owner sees requests).</div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Claimed / Pending items</h3>
          {items.map(it=> (
            <div key={it._id} className="p-2 border rounded mb-2">
              <div className="flex justify-between"><div className="font-semibold">{it.title}</div><div>{it.claimed ? 'CLAIMED':'PENDING'}</div></div>
              <div className="text-sm">Reward: ₱{it.reward || 0}</div>
            </div>
          ))}
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Reward summary</h3>
          <div className="text-sm">Total rewards shown in admin panel.</div>
        </div>
      </div>
    </div>
  )
}
