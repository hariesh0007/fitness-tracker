import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SocialShare = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/workout-history')
      .then(res => setHistory(res.data))
      .catch(console.error);
  }, []);

 
  const convertToCSV = () => {
    const headers = ['Date', 'Workout Name', 'Sets', 'Reps', 'Weight'];
    const rows = history.map(w => [w.date, w.workoutName, w.sets, w.reps, w.weight]);
    let csv = headers.join(',') + '\n';
    rows.forEach(row => {
      csv += row.join(',') + '\n';
    });
    return csv;
  };

  
  const downloadCSV = () => {
    const csv = convertToCSV();
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'workout-history.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const shareOnTwitter = () => {
    if (history.length === 0) return alert('No workouts to share!');
    const last = history[history.length - 1];
    const text = encodeURIComponent(
      `Just completed ${last.workoutName} (${last.sets} sets x ${last.reps} reps @ ${last.weight}kg)! #FitnessTracker`
    );
    window.open(`https://twitter.com/intent/tweet?text=${text}`, '_blank');
  };

  return (
    <div>
      <h2>Social Sharing</h2>
      <button onClick={downloadCSV} style={{ marginRight: '10px' }}>Export Workout History (CSV)</button>
      <button onClick={shareOnTwitter}>Share Latest Workout on Twitter</button>
    </div>
  );
};

export default SocialShare;

