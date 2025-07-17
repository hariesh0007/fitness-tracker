import React, { useState } from 'react';
import axios from 'axios';

const workoutOptions = {
  Chest: ['Bench Press', 'Incline Dumbbell Press', 'Chest Fly'],
  Back: ['Pull-ups', 'Deadlift', 'Bent-over Row'],
  Legs: ['Squats', 'Lunges', 'Leg Press'],
  Shoulders: ['Overhead Press', 'Lateral Raise', 'Front Raise'],
  Arms: ['Bicep Curls', 'Tricep Dips', 'Hammer Curls'],
  Core: ['Planks', 'Crunches', 'Leg Raises']
};

const CustomWorkouts = () => {
  const [name, setName] = useState('');
  const [selectedPart, setSelectedPart] = useState('Chest');
  const [exercises, setExercises] = useState([]);
  const [message, setMessage] = useState('');

  const addExercise = (exercise) => {
    if (!exercises.includes(exercise)) {
      setExercises([...exercises, exercise]);
    }
  };

  const submitWorkout = () => {
    axios.post('http://localhost:4000/api/custom-workouts', { name, exercises })
      .then(res => setMessage(res.data.message))
      .catch(console.error);
  };

  return (
    <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '10px' }}>
      <h2>💪 Create Custom Workout</h2>

      <input
        placeholder="Workout Name"
        value={name}
        onChange={e => setName(e.target.value)}
        style={{ marginBottom: '10px' }}
      />

      <div>
        <label><strong>Select Body Part:</strong></label><br />
        <select value={selectedPart} onChange={e => setSelectedPart(e.target.value)}>
          {Object.keys(workoutOptions).map(part => (
            <option key={part} value={part}>{part}</option>
          ))}
        </select>
      </div>

      <div>
        <p><strong>Exercises for {selectedPart}:</strong></p>
        {workoutOptions[selectedPart].map((exercise, i) => (
          <button key={i} onClick={() => addExercise(exercise)} style={{ margin: '4px' }}>
            {exercise}
          </button>
        ))}
      </div>

      <div>
        <h3>📋 Selected Exercises:</h3>
        <ul>
          {exercises.map((e, i) => <li key={i}>{e}</li>)}
        </ul>
      </div>

      <button onClick={submitWorkout} style={{ marginTop: '10px' }}>Submit Workout</button>
      {message && <p style={{ color: 'green' }}>{message}</p>}
    </div>
  );
};

export default CustomWorkouts;
