import React, { useEffect, useState } from 'react';
import api from '../api';

export default function AdminDashboard({ user }) {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('Loading...');

  useEffect(() => {
    async function load() {
      try {
        const data = await api.fetchItems();
        setItems(data);
        setMsg('');
      } catch (err) {
        setMsg(`❌ ${err.message}`);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <h2>Admin Dashboard</h2>
      {msg && <p className="muted">{msg}</p>}
      {items.map(item => (
        <div key={item._id} className="card">
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <button className="btn" onClick={() => alert('Verify logic soon!')}>
            Verify Claim
          </button>
        </div>
      ))}
    </div>
  );
}
