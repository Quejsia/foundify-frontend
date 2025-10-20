import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

export default function ReportItem({ user }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [type, setType] = useState('lost');
  const [image, setImage] = useState('');
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  // Convert image file to base64
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('Posting...');
    
    try {
      const response = await api.post('/items', {
        title,
        description,
        location,
        type,
        image
      });
      
      setMsg('✅ Item posted successfully!');
      
      // Clear form
      setTitle('');
      setDescription('');
      setLocation('');
      setImage('');
      
      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
    } catch (err) {
      setMsg(`❌ ${err.message}`);
    }
  }

  return (
    <div className="container">
      <div className="card">
        <h2>📦 Report Lost/Found Item</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Item title (e.g., Black Wallet)"
            value={title}
            onChange={e => setTitle(e.target.value)}
            required
          />
          
          <input
            type="text"
            placeholder="Location (e.g., Library, Block A)"
            value={location}
            onChange={e => setLocation(e.target.value)}
            required
          />
          
          <textarea
            placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            required
          />
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Type:
            </label>
            <select 
              value={type} 
              onChange={e => setType(e.target.value)}
              style={{ 
                width: '100%', 
                padding: '0.75rem', 
                borderRadius: '8px',
                border: '1px solid #ddd',
                fontSize: '1rem'
              }}
            >
              <option value="lost">Lost</option>
              <option value="found">Found</option>
            </select>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '600' }}>
              Upload Image (optional):
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={{ 
                width: '100%', 
                padding: '0.5rem',
                border: '1px solid #ddd',
                borderRadius: '8px'
              }}
            />
          </div>
          
          {image && (
            <div style={{ marginBottom: '1rem' }}>
              <img 
                src={image} 
                alt="Preview" 
                style={{ 
                  maxWidth: '200px', 
                  borderRadius: '8px',
                  border: '2px solid #ddd'
                }} 
              />
            </div>
          )}
          
          <button className="btn" type="submit">
            Post Item
          </button>
        </form>
        
        {msg && <p className="muted small" style={{ marginTop: '1rem' }}>{msg}</p>}
      </div>
    </div>
  );
 }
