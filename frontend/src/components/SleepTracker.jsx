import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SleepTracker = () => {
  const [records, setRecords] = useState([]);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');

  const addRecord = () => {
    if (!start || !end) return alert('Enter both start and end times');
    const startTime = new Date(`1970-01-01T${start}:00`);
    let endTime = new Date(`1970-01-01T${end}:00`);
   
    if (endTime <= startTime) {
      endTime.setDate(endTime.getDate() + 1);
    }
    const diffMs = endTime - startTime;
    const diffHrs = diffMs / (1000 * 60 * 60);

    setRecords([...records, { date: new Date().toLocaleDateString(), hours: diffHrs.toFixed(2) }]);
    setStart('');
    setEnd('');
  };

  const data = {
    labels: records.map(r => r.date),
    datasets: [
      {
        label: 'Sleep Hours',
        data: records.map(r => r.hours),
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <h2>Sleep Tracker</h2>
      <label>
        Sleep Start Time:
        <input type="time" value={start} onChange={e => setStart(e.target.value)} />
      </label>
      <br />
      <label>
        Wake Up Time:
        <input type="time" value={end} onChange={e => setEnd(e.target.value)} />
      </label>
      <br />
      <button onClick={addRecord}>Add Sleep Record</button>

      {records.length > 0 && (
        <div style={{ maxWidth: '600px', marginTop: '20px' }}>
          <Line data={data} />
        </div>
      )}
    </div>
  );
};

export default SleepTracker;
