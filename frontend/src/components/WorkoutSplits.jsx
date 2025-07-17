import React, { useEffect, useState } from 'react';
import axios from 'axios';

const WorkoutSplits = () => {
  const [splits, setSplits] = useState({});

  useEffect(() => {
    axios.get('http://localhost:4000/api/splits')
      .then(res => setSplits(res.data))
      .catch(console.error);
  }, []);

  return (
    <div>
      <h2>Workout Splits</h2>
      {Object.entries(splits).map(([split, exercises]) => (
        <div key={split}>
          <h3>{split.toUpperCase()}</h3>
          <ul>
            {exercises.map((ex, i) => <li key={i}>{ex}</li>)}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default WorkoutSplits;
