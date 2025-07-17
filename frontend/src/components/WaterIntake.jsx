import React, { useState } from 'react';

const WaterIntake = () => {
  const [waterCups, setWaterCups] = useState(0);
  const dailyGoal = 8;

  const addCup = () => setWaterCups(prev => Math.min(prev + 1, dailyGoal));
  const removeCup = () => setWaterCups(prev => Math.max(prev - 1, 0));
  const reset = () => setWaterCups(0);

  return (
    <div>
      <h2>Water Intake Monitor</h2>
      <p>Daily Goal: {dailyGoal} cups</p>
      <p>Cups consumed: {waterCups}</p>

      <button onClick={addCup}>Add Cup</button>
      <button onClick={removeCup} disabled={waterCups === 0}>Remove Cup</button>
      <button onClick={reset}>Reset</button>

      <div style={{marginTop: '10px', background: '#eee', width: '100%', height: '20px', borderRadius: '10px'}}>
        <div
          style={{
            width: `${(waterCups / dailyGoal) * 100}%`,
            height: '100%',
            background: '#4caf50',
            borderRadius: '10px',
            transition: 'width 0.3s'
          }}
        />
      </div>
    </div>
  );
};

export default WaterIntake;
