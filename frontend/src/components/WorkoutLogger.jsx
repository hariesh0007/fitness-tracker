import React, { useState, useEffect } from 'react';
import axios from 'axios';

const WorkoutLogger = () => {
  const [date, setDate] = useState('');
  const [workoutName, setWorkoutName] = useState('');
  const [sets, setSets] = useState('');
  const [reps, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const logWorkout = () => {
    setError('');
   
    if (!date || !workoutName.trim()) {
      setError('Please fill in date and workout name.');
      return;
    }
    if (parseInt(sets) <= 0 || parseInt(reps) <= 0 || parseFloat(weight) < 0) {
      setError('Sets and reps must be positive numbers; weight cannot be negative.');
      return;
    }

    setLoading(true);
    axios.post('http://localhost:4000/api/log-workout', {
      date,
      workoutName: workoutName.trim(),
      sets: parseInt(sets),
      reps: parseInt(reps),
      weight: parseFloat(weight)
    })
    .then(() => {
      fetchHistory();
      
      setDate('');
      setWorkoutName('');
      setSets('');
      setReps('');
      setWeight('');
    })
    .catch(err => {
      console.error(err);
      setError('Failed to log workout. Try again.');
    })
    .finally(() => setLoading(false));
  };

  const fetchHistory = () => {
    setLoading(true);
    axios.get('http://localhost:4000/api/workout-history')
      .then(res => setHistory(res.data))
      .catch(err => {
        console.error(err);
        setError('Failed to fetch workout history.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  return (
    <div style={{ maxWidth: 400, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>Log Workout</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 20 }}>
        <input 
          type="date" 
          value={date} 
          onChange={e => setDate(e.target.value)} 
          style={{ padding: 8, fontSize: 16 }}
        />
        <input 
          placeholder="Workout Name" 
          value={workoutName} 
          onChange={e => setWorkoutName(e.target.value)} 
          style={{ padding: 8, fontSize: 16 }}
        />
        <input 
          placeholder="Sets" 
          type="number" 
          min={1}
          value={sets} 
          onChange={e => setSets(e.target.value)} 
          style={{ padding: 8, fontSize: 16 }}
        />
        <input 
          placeholder="Reps" 
          type="number" 
          min={1}
          value={reps} 
          onChange={e => setReps(e.target.value)} 
          style={{ padding: 8, fontSize: 16 }}
        />
        <input 
          placeholder="Weight (kg)" 
          type="number" 
          min={0}
          step="0.1"
          value={weight} 
          onChange={e => setWeight(e.target.value)} 
          style={{ padding: 8, fontSize: 16 }}
        />
        <button 
          onClick={logWorkout} 
          disabled={loading}
          style={{ padding: 10, fontSize: 16, cursor: loading ? 'not-allowed' : 'pointer' }}
        >
          {loading ? 'Processing...' : 'Log Workout'}
        </button>
      </div>

      {error && <div style={{ color: 'red', marginBottom: 15 }}>{error}</div>}

      <h3>Workout History</h3>
      {history.length === 0 && <p>No workouts logged yet.</p>}
      <ul style={{ paddingLeft: 20 }}>
        {history.map((w) => (
          <li key={w.id || `${w.date}-${w.workoutName}-${Math.random()}`}>
            <strong>{new Date(w.date).toLocaleDateString()}</strong>: {w.workoutName} — {w.sets} sets x {w.reps} reps @ {w.weight} kg
          </li>
        ))}
      </ul>
    </div>
  );
};

export default WorkoutLogger;
