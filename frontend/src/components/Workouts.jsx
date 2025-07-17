import React, { useState } from 'react';

function Workouts({ bmi, fatPercent }) {
  const [goal, setGoal] = useState('fat-loss');

  
  const splitsByGoal = {
    'fat-loss': ['Cardio', 'Full-body circuit', 'HIIT'],
    'muscle-gain': ['Chest & Triceps', 'Back & Biceps', 'Legs & Shoulders'],
    'maintenance': ['Moderate cardio', 'Strength training'],
  };

  const workoutSplits = splitsByGoal[goal] || [];

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Workout Splits</h2>

      <label htmlFor="goal-select">Select your goal: </label>
      <select
        id="goal-select"
        value={goal}
        onChange={(e) => setGoal(e.target.value)}
        style={{ marginBottom: '10px' }}
      >
        <option value="fat-loss">Fat Loss</option>
        <option value="muscle-gain">Muscle Gain</option>
        <option value="maintenance">Maintenance</option>
      </select>

      <ul>
        {workoutSplits.map((split, index) => (
          <li key={index}>{split}</li>
        ))}
      </ul>
    </div>
  );
}

export default Workouts;
