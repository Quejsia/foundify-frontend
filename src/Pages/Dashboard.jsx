import React, {useState, useEffect} from 'react'
import axios from 'axios'
const API = import.meta.env.VITE_API_URL || 'https://foundify-backend-12.onrender.com'
export default function Dashboard({user}){
  const [items,setItems]=useState([]), [loading,setLoading]=useState(false)
  const [title,setTitle]=useState(''), [desc,setDesc]=useState(''), [type,setType]=useState('lost'), [file,setFile]=useState(null), [progress,setProgress]=useState(0)
  useEffect(()=>{ load() },[])
  async function load(){ setLoading(true); try{ const res = await axios.get(API + '/api/items'); setItems(res.data) }catch(e){ console.error(e) }finally{ setLoading(false) } }
  async function submit(e){ e.preventDefault()
    try{
      let imageUrl = ''
      if(file){
        const fd = new FormData(); fd.append('file', file)
        const res = await axios.post(API + '/api/upload/upload', fd, { headers:{ 'Content-Type':'multipart/form-data' },
          onUploadProgress: (ev)=>{ if(ev.total) setProgress(Math.round((ev.loaded/ev.total)*100)) }
        })
        imageUrl = res.data.secure_url || res.data.url || ''
      }
      await axios.post(API + '/api/items', { title, description: desc, image: imageUrl, type, location: 'Unknown', reward: 0 }, { headers: { Authorization: 'Bearer ' + localStorage.getItem('foundify_token') } })
      setTitle(''); setDesc(''); setFile(null); setProgress(0); load()
    }catch(e){ console.error(e); alert('Error') }
  }
  return (
    <div className="max-w-3xl mx-auto mt-6">
      <h1 className="text-2xl font-semibold mb-4">Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Post Lost/Found</h3>
          <form onSubmit={submit} className="space-y-2">
            <input className="w-full p-2 border rounded" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
            <textarea className="w-full p-2 border rounded" placeholder="Description" value={desc} onChange={e=>setDesc(e.target.value)} />
            <select className="p-2 border rounded" value={type} onChange={e=>setType(e.target.value)}>
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
            <input type="file" onChange={e=>setFile(e.target.files[0])} />
            {progress>0 && <div className="text-sm">Uploading: {progress}%</div>}
            <button className="px-4 py-2 bg-sky-600 text-white rounded">Post</button>
          </form>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <h3 className="font-semibold mb-2">Recent items</h3>
          {loading ? <div>Loading...</div> : items.map(it=>(
            <div key={it._id} className="p-3 border rounded mb-2">
              <div className="flex justify-between">
                <div>
                  <div className="font-semibold">{it.title}</div>
                  <div className="text-sm">{it.location} • {new Date(it.createdAt).toLocaleString()}</div>
                </div>
                <div className="text-sm">{it.type?.toUpperCase()}</div>
              </div>
              <p className="mt-2 text-sm">{it.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
