import React, { useState } from 'react';

const cardioWorkouts = {
  fatLoss: [
    { name: 'Treadmill (30 min)', sets: 1, reps: '30 min', rest: 'N/A' },
    { name: 'Jump Rope', sets: 3, reps: '2 min', rest: '60 sec' },
    { name: 'HIIT', sets: 4, reps: '30 sec on/off', rest: '30 sec' },
  ],
  muscleGain: [
    { name: 'Cycling (20 min)', sets: 1, reps: '20 min', rest: 'N/A' },
  ],
  maintain: [
    { name: 'Brisk Walking (30 min)', sets: 1, reps: '30 min', rest: 'N/A' },
  ],
};

const weightTrainingWorkouts = {
  fatLoss: [
    { name: 'Full Body Circuit', sets: 3, reps: 15, rest: '60 sec' },
    { name: 'Kettlebell Swings', sets: 3, reps: 20, rest: '60 sec' },
    { name: 'Bodyweight Squats', sets: 3, reps: 20, rest: '45 sec' },
    { name: 'Push-ups', sets: 3, reps: 15, rest: '60 sec' },
  ],
  muscleGain: [
    { name: 'Bench Press', sets: 4, reps: 8, rest: '90 sec' },
    { name: 'Squats', sets: 4, reps: 10, rest: '90 sec' },
    { name: 'Deadlift', sets: 3, reps: 6, rest: '2 min' },
    { name: 'Pull-ups', sets: 3, reps: 8, rest: '90 sec' },
  ],
  maintain: [
    { name: 'Dumbbell Shoulder Press', sets: 3, reps: 12, rest: '60 sec' },
    { name: 'Lunges', sets: 3, reps: 15, rest: '60 sec' },
    { name: 'Bodyweight Rows', sets: 3, reps: 12, rest: '60 sec' },
  ],
};

const SmartAutoPlan = () => {
  const [goal, setGoal] = useState('maintain');
  const [days, setDays] = useState(3);
  const [plan, setPlan] = useState([]);
  const [extraWorkout, setExtraWorkout] = useState('');
  const [extraWorkouts, setExtraWorkouts] = useState([]);

  
  const generatePlan = () => {
    const cardio = cardioWorkouts[goal];
    const weight = weightTrainingWorkouts[goal];

   
    const allWorkouts = [...weight, ...cardio, ...extraWorkouts];

   
    const workoutsPerDay = Math.ceil(allWorkouts.length / days);

    const weeklyPlan = [];
    for (let i = 0; i < days; i++) {
      const dayWorkouts = allWorkouts.slice(i * workoutsPerDay, (i + 1) * workoutsPerDay);

      weeklyPlan.push({
        day: `Day ${i + 1}`,
        workouts: dayWorkouts.length > 0
          ? dayWorkouts
          : [{ name: 'Rest or Light Activity', sets: '-', reps: '-', rest: '-' }],
      });
    }

    setPlan(weeklyPlan);
  };

  const addExtraWorkout = () => {
    if (!extraWorkout.trim()) return;
    setExtraWorkouts([...extraWorkouts, { name: extraWorkout.trim(), sets: 3, reps: 12, rest: '60 sec' }]);
    setExtraWorkout('');
  };

  return (
    <div style={{ maxWidth: 600, margin: 'auto' }}>
      <h2>🧠 Smart Auto-Generated Fitness Plan</h2>

      <label>
        Goal:
        <select value={goal} onChange={e => setGoal(e.target.value)} style={{ marginLeft: 10 }}>
          <option value="fatLoss">Fat Loss</option>
          <option value="muscleGain">Muscle Gain</option>
          <option value="maintain">Maintain</option>
        </select>
      </label>

      <br /><br />

      <label>
        Workout Days/Week:
        <input
          type="number"
          min={1}
          max={7}
          value={days}
          onChange={e => setDays(Number(e.target.value))}
          style={{ marginLeft: 10, width: 50 }}
        />
      </label>

      <br /><br />

      <label>
        Add Extra Workout:
        <input
          type="text"
          value={extraWorkout}
          onChange={e => setExtraWorkout(e.target.value)}
          placeholder="e.g., Dumbbell Curls"
          style={{ marginLeft: 10 }}
        />
        <button onClick={addExtraWorkout} style={{ marginLeft: 10 }}>Add</button>
      </label>

      <br /><br />

      <button onClick={generatePlan}>Generate Plan</button>

      {plan.length > 0 && (
        <div style={{ marginTop: 20 }}>
          {plan.map(({ day, workouts }) => (
            <div key={day} style={{ marginBottom: 25 }}>
              <h3>{day}</h3>
              <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th>Workout</th>
                    <th>Sets</th>
                    <th>Reps/Duration</th>
                    <th>Rest</th>
                  </tr>
                </thead>
                <tbody>
                  {workouts.map(({ name, sets, reps, rest }, i) => (
                    <tr key={i}>
                      <td>{name}</td>
                      <td>{sets}</td>
                      <td>{reps}</td>
                      <td>{rest}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SmartAutoPlan;
