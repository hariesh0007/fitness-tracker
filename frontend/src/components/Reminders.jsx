import React, { useState, useEffect } from 'react';

const Reminders = () => {
  const [workoutTime, setWorkoutTime] = useState('');
  const [mealTime, setMealTime] = useState('');
  const [waterTime, setWaterTime] = useState('');
  const [permission, setPermission] = useState(Notification.permission);

  
  useEffect(() => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then(setPermission);
    }
  }, []);

  
  const showNotification = (title, body) => {
    if (permission === 'granted') {
      new Notification(title, { body });
    }
  };

  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const timeStr = now.toTimeString().slice(0,5); 

      if (timeStr === workoutTime && workoutTime !== '') {
        showNotification('Workout Reminder', 'Time to work out!');
      }
      if (timeStr === mealTime && mealTime !== '') {
        showNotification('Meal Reminder', 'Time to eat your meal.');
      }
      if (timeStr === waterTime && waterTime !== '') {
        showNotification('Water Reminder', 'Time to drink water.');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [workoutTime, mealTime, waterTime, permission]);

  return (
    <div>
      <h2>Reminders & Notifications</h2>
      {permission !== 'granted' && (
        <p>Please allow notifications in your browser to get reminders.</p>
      )}

      <label>
        Workout Reminder Time (HH:MM):
        <input type="time" value={workoutTime} onChange={e => setWorkoutTime(e.target.value)} />
      </label>
      <br />
      <label>
        Meal Reminder Time (HH:MM):
        <input type="time" value={mealTime} onChange={e => setMealTime(e.target.value)} />
      </label>
      <br />
      <label>
        Water Reminder Time (HH:MM):
        <input type="time" value={waterTime} onChange={e => setWaterTime(e.target.value)} />
      </label>
    </div>
  );
};

export default Reminders;
