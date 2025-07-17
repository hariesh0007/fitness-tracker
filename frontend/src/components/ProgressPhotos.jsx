import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProgressPhotos = () => {
  const [file, setFile] = useState(null);
  const [photos, setPhotos] = useState([]);

  const fetchPhotos = () => {
    axios.get('http://localhost:4000/api/photos')
      .then(res => setPhotos(res.data))
      .catch(console.error);
  };

  const uploadPhoto = () => {
    if (!file) return alert('Select a photo first');
    const formData = new FormData();
    formData.append('photo', file);

    axios.post('http://localhost:4000/api/upload-photo', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    .then(() => {
      fetchPhotos();
      setFile(null);
    })
    .catch(console.error);
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return (
    <div>
      <h2>Progress Photos</h2>
      <input type="file" accept="image/*" onChange={e => setFile(e.target.files[0])} />
      <button onClick={uploadPhoto}>Upload</button>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '20px' }}>
        {photos.map((p, i) => (
          <div key={i}>
            <img 
              src={`http://localhost:4000/uploads/${p.filename}`} 
              alt={`Progress ${i}`} 
              width="150" 
              style={{ borderRadius: '8px', objectFit: 'cover' }} 
            />
            <p style={{ fontSize: '12px' }}>{new Date(p.uploadedAt).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressPhotos;
