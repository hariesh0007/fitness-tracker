import React, { useState } from 'react';

const BmiCalculator = () => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [gender, setGender] = useState('male');
  const [bmi, setBmi] = useState(null);
  const [category, setCategory] = useState('');

  const calculateBmi = () => {
    const h = parseFloat(height) / 100;
    const w = parseFloat(weight);
    if (h > 0 && w > 0) {
      const bmiValue = (w / (h * h)).toFixed(2);
      setBmi(bmiValue);
      setCategory(getBmiCategory(bmiValue));
    }
  };

  const getBmiCategory = (bmi) => {
    bmi = parseFloat(bmi);
    if (bmi < 18.5) return 'Underweight';
    else if (bmi < 24.9) return 'Normal weight';
    else if (bmi < 29.9) return 'Overweight';
    else return 'Obese';
  };

  const getIdealRange = () => {
    return 'Ideal: 18.5 - 24.9';
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '8px', marginTop: '20px' }}>
      <h2>📏 BMI Calculator</h2>

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
      <input placeholder="Weight (kg)" value={weight} onChange={e => setWeight(e.target.value)} />
      <input placeholder="Height (cm)" value={height} onChange={e => setHeight(e.target.value)} />

      <br /><br />
      <button onClick={calculateBmi}>Calculate BMI</button>

      {bmi && (
        <div style={{ marginTop: '10px' }}>
          <p><strong>Your BMI:</strong> {bmi}</p>
          <p><strong>Category:</strong> {category}</p>
          <p><strong>{getIdealRange()}</strong></p>
        </div>
      )}
    </div>
  );
};

export default BmiCalculator;
