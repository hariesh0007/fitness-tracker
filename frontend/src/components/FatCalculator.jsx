import React, { useState } from 'react';

const FatCalculator = () => {
  const [waist, setWaist] = useState('');
  const [neck, setNeck] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [fat, setFat] = useState(null);

  const calculateFat = () => {
    const w = parseFloat(waist);
    const n = parseFloat(neck);
    const h = parseFloat(height);

    if (w > 0 && n > 0 && h > 0) {
      let fatValue;
      if (gender === 'male') {
        fatValue = 86.010 * Math.log10(w - n) - 70.041 * Math.log10(h) + 36.76;
      } else {
        
        fatValue = 163.205 * Math.log10(w - n) - 97.684 * Math.log10(h) - 78.387;
      }

      setFat(fatValue.toFixed(2));
    }
  };

  const getIdealRange = () => {
    return gender === 'male'
      ? 'Ideal: 10% - 20%'
      : 'Ideal: 18% - 28%';
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h2>🧮 Body Fat Calculator</h2>

      <label><strong>Gender:</strong></label><br />
      <label>
        <input type="radio" value="male" checked={gender === 'male'} onChange={() => setGender('male')} />
        Male
      </label>
      {' '}
      <label>
        <input type="radio" value="female" checked={gender === 'female'} onChange={() => setGender('female')} />
        Female
      </label>

      <br /><br />
      <input placeholder="Waist (cm)" value={waist} onChange={e => setWaist(e.target.value)} />
      <input placeholder="Neck (cm)" value={neck} onChange={e => setNeck(e.target.value)} />
      <input placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />

      <br /><br />
      <button onClick={calculateFat}>Calculate Fat %</button>

      {fat && (
        <div style={{ marginTop: '10px' }}>
          <p><strong>Your Body Fat %:</strong> {fat}%</p>
          <p><strong>{getIdealRange()}</strong></p>
        </div>
      )}
    </div>
  );
};

export default FatCalculator;
