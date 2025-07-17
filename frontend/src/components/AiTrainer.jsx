import React, { useState } from 'react';

const AiTrainer = ({ currentProfile }) => {
  const [goal, setGoal] = useState('muscle_gain');
  const [suggestions, setSuggestions] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGoalChange = (e) => {
    setGoal(e.target.value);
  };

  const generateSuggestions = () => {
    setLoading(true);
    setTimeout(() => {
      const suggs = [];

      if (!currentProfile) {
        setSuggestions(['Please select a user profile']);
        setLoading(false);
        return;
      }

      switch (goal) {
        case 'fat_loss':
          suggs.push('🏋️ Workout: Do HIIT & full-body training 4–5x/week.');
          suggs.push('🥗 Diet: High protein, low carb, caloric deficit.');
          suggs.push('🚶 Include daily walks or light cardio.');
          break;
        case 'muscle_gain':
          suggs.push('🏋️ Workout: Follow push/pull/legs split with progressive overload.');
          suggs.push('🥩 Diet: High protein, calorie surplus, complex carbs.');
          suggs.push('💤 Ensure 7–8 hours of sleep per night.');
          break;
        case 'maintenance':
          suggs.push('💪 Workout: 3x/week full-body strength + 2x cardio.');
          suggs.push('🍽️ Diet: Balanced macros at maintenance calories.');
          suggs.push('🧘 Include flexibility or mobility work weekly.');
          break;
        default:
          suggs.push('Select a fitness goal to get suggestions.');
      }

      setSuggestions(suggs);
      setLoading(false);
    }, 1000); 
  };

  return (
    <div style={{ padding: '10px', border: '1px solid #ddd', borderRadius: '8px', marginTop: '20px' }}>
      <h2>🧠 AI Trainer</h2>

      <label htmlFor="goal-select"><strong>Select Your Fitness Goal:</strong></label>
      <select id="goal-select" value={goal} onChange={handleGoalChange} style={{ marginLeft: '10px', padding: '5px' }}>
        <option value="fat_loss">Fat Loss</option>
        <option value="muscle_gain">Muscle Gain</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <br /><br />
      <button onClick={generateSuggestions} disabled={loading} style={{ padding: '8px 16px' }}>
        {loading ? 'Generating...' : 'Get AI Suggestions'}
      </button>

      {suggestions.length > 0 && (
        <ul style={{ marginTop: '20px' }}>
          {suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AiTrainer;
