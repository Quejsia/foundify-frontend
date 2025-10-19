import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function Dashboard({ user }) {
  const [items, setItems] = useState([]);
  const [msg, setMsg] = useState('Loading items...');

  useEffect(() => {
    async function loadItems() {
      try {
        const data = await api.fetchItems();
        setItems(data);
        setMsg('');
      } catch (err) {
        setMsg(`❌ ${err.message}`);
      }
    }
    loadItems();
  }, []);

  return (
    <div className="container">
      <h2>📦 Lost & Found Items</h2>
      {msg && <p className="muted">{msg}</p>}
      <div className="row">
        {items.map(item => (
          <div key={item._id} className="card col">
            <h3>{item.title}</h3>
            <p>{item.description}</p>
            {item.image && <img src={item.image} alt="" width="100%" />}
            <p className="muted small">Location: {item.location || 'Unknown'}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
