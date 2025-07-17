import React, { useState } from 'react';

const UserProfile = ({ onUpdate }) => {
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [goalCalories, setGoalCalories] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdate({
      weight: parseFloat(weight),
      height: parseFloat(height),
      goalCalories: parseInt(goalCalories)
    });
  };

  return (
    <div>
      <h2>User Profile & Goals</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Weight (kg)"
          value={weight}
          onChange={e => setWeight(e.target.value)}
          required
        />
        <input
          placeholder="Height (cm)"
          value={height}
          onChange={e => setHeight(e.target.value)}
          required
        />
        <input
          placeholder="Daily Calorie Goal"
          value={goalCalories}
          onChange={e => setGoalCalories(e.target.value)}
          required
        />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default UserProfile;
