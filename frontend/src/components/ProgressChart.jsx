import React, { useState } from 'react';
import {
  BarChart, Bar,
  LineChart, Line,
  PieChart, Pie, Cell,
  AreaChart, Area,
  XAxis, YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const COLORS = ['#82ca9d', '#8884d8', '#ffc658', '#ff7f50', '#8a2be2'];

const InteractiveProgressChart = ({ initialGoal = 500 }) => {
  const [caloriesData, setCaloriesData] = useState([]);
  const [goalCalories, setGoalCalories] = useState(initialGoal);
  const [dateInput, setDateInput] = useState('');
  const [caloriesInput, setCaloriesInput] = useState('');
  const [chartType, setChartType] = useState('bar');
  const [error, setError] = useState('');


  const addEntry = () => {
    setError('');
    if (!dateInput) {
      setError('Please select a date.');
      return;
    }
    if (!caloriesInput || isNaN(caloriesInput) || caloriesInput <= 0) {
      setError('Please enter a valid positive calories burned value.');
      return;
    }
    
    const existingIndex = caloriesData.findIndex(d => d.date === dateInput);
    if (existingIndex !== -1) {
     
      const updatedData = [...caloriesData];
      updatedData[existingIndex].calories = Number(caloriesInput);
      setCaloriesData(updatedData);
    } else {
      setCaloriesData([...caloriesData, { date: dateInput, calories: Number(caloriesInput) }]);
    }
    setDateInput('');
    setCaloriesInput('');
  };

 
  const removeEntry = (date) => {
    setCaloriesData(caloriesData.filter(d => d.date !== date));
  };


  const dataWithGoal = caloriesData.map(item => ({
    date: item.date,
    burned: item.calories,
    goal: goalCalories,
  }));

  
  const totalBurned = caloriesData.reduce((sum, d) => sum + d.calories, 0);
  const pieData = caloriesData.map(item => ({
    name: item.date,
    value: item.calories,
    percent: totalBurned ? ((item.calories / totalBurned) * 100).toFixed(1) : 0,
  }));

 
  let cumulative = 0;
  const areaData = caloriesData
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .map(item => {
      cumulative += item.calories;
      return { date: item.date, cumulative };
    });

 
  const buttonStyle = (type) => ({
    marginRight: 10,
    padding: '8px 15px',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: chartType === type ? '#007acc' : '#ccc',
    color: chartType === type ? '#fff' : '#333',
    fontWeight: '600',
  });

  return (
    <div
      style={{
        maxWidth: 750,
        margin: '20px auto',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 12,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        fontFamily: "'Poppins', sans-serif",
      }}
      aria-label="Interactive calories burned tracker and chart"
    >
      <h2 style={{ textAlign: 'center', marginBottom: 20, color: '#333' }}>
        🔥 Interactive Calories Burned Tracker
      </h2>

      {/* Goal input */}
      <div style={{ marginBottom: 20, textAlign: 'center' }}>
        <label style={{ fontWeight: '600', marginRight: 10 }}>
          Goal Calories:
          <input
            type="number"
            min="0"
            value={goalCalories}
            onChange={e => setGoalCalories(Number(e.target.value) || 0)}
            style={{
              marginLeft: 8,
              padding: 6,
              width: 80,
              borderRadius: 6,
              border: '1px solid #ccc',
            }}
            aria-label="Goal calories input"
          />
        </label>
      </div>

      {/* Input form */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginBottom: 20 }}>
        <input
          type="date"
          value={dateInput}
          onChange={e => setDateInput(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc' }}
          aria-label="Date input for calories"
        />
        <input
          type="number"
          placeholder="Calories burned"
          min="0"
          value={caloriesInput}
          onChange={e => setCaloriesInput(e.target.value)}
          style={{ padding: 8, borderRadius: 6, border: '1px solid #ccc', width: 140 }}
          aria-label="Calories burned input"
        />
        <button
          onClick={addEntry}
          style={{
            padding: '8px 16px',
            backgroundColor: '#007acc',
            color: 'white',
            borderRadius: 6,
            border: 'none',
            cursor: 'pointer',
            fontWeight: '600',
          }}
          aria-label="Add calories entry button"
        >
          Add / Update
        </button>
      </div>

      {/* Error message */}
      {error && (
        <p style={{ color: 'red', fontWeight: '600', textAlign: 'center', marginBottom: 20 }}>
          {error}
        </p>
      )}

      {/* List of entries */}
      {caloriesData.length > 0 && (
        <div
          style={{
            maxHeight: 180,
            overflowY: 'auto',
            marginBottom: 20,
            backgroundColor: '#fff',
            borderRadius: 8,
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            padding: 12,
          }}
          aria-label="List of calories entries"
        >
          <table
            style={{ width: '100%', borderCollapse: 'collapse' }}
            aria-describedby="calories-entries"
          >
            <thead>
              <tr>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #ddd' }}>Date</th>
                <th style={{ textAlign: 'left', padding: '8px 12px', borderBottom: '1px solid #ddd' }}>Calories Burned</th>
                <th style={{ textAlign: 'center', padding: '8px 12px', borderBottom: '1px solid #ddd' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {caloriesData
                .sort((a, b) => new Date(b.date) - new Date(a.date))
                .map(({ date, calories }) => (
                  <tr key={date}>
                    <td style={{ padding: '8px 12px' }}>{date}</td>
                    <td style={{ padding: '8px 12px' }}>{calories}</td>
                    <td style={{ padding: '8px 12px', textAlign: 'center' }}>
                      <button
                        onClick={() => removeEntry(date)}
                        style={{
                          backgroundColor: '#ff4d4d',
                          border: 'none',
                          borderRadius: 6,
                          color: 'white',
                          padding: '6px 10px',
                          cursor: 'pointer',
                        }}
                        aria-label={`Remove calories entry for ${date}`}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Chart toggle buttons */}
      <div style={{ textAlign: 'center', marginBottom: 20 }}>
        {['bar', 'line', 'pie', 'area'].map(type => (
          <button
            key={type}
            onClick={() => setChartType(type)}
            style={{
              marginRight: 10,
              padding: '8px 15px',
              borderRadius: 6,
              border: 'none',
              cursor: 'pointer',
              backgroundColor: chartType === type ? '#007acc' : '#ccc',
              color: chartType === type ? '#fff' : '#333',
              fontWeight: '600',
            }}
            aria-pressed={chartType === type}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)} Chart
          </button>
        ))}
      </div>

      {/* Charts */}
      <ResponsiveContainer width="100%" height={350}>
        {chartType === 'bar' && (
          <BarChart data={dataWithGoal} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Bar dataKey="burned" fill="#82ca9d" name="Calories Burned" />
            <Bar dataKey="goal" fill="#8884d8" name="Goal Calories" />
          </BarChart>
        )}

        {chartType === 'line' && (
          <LineChart data={dataWithGoal} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Line type="monotone" dataKey="burned" stroke="#82ca9d" strokeWidth={3} name="Calories Burned" />
            <Line type="monotone" dataKey="goal" stroke="#8884d8" strokeWidth={3} name="Goal Calories" strokeDasharray="5 5" />
          </LineChart>
        )}

        {chartType === 'pie' && (
          <PieChart>
            <Tooltip formatter={(value, name, props) => [`${value} cal`, `${props.payload.name} (${props.payload.percent}%)`]} />
            <Legend verticalAlign="top" height={36} />
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={120}
              fill="#8884d8"
              label={({ name, percent }) => `${name}: ${percent}%`}
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
        )}

        {chartType === 'area' && (
          <AreaChart data={areaData} margin={{ top: 20, right: 30, left: 10, bottom: 5 }}>
            <defs>
              <linearGradient id="colorCumulative" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
            <Area
              type="monotone"
              dataKey="cumulative"
              stroke="#82ca9d"
              fillOpacity={1}
              fill="url(#colorCumulative)"
              name="Cumulative Calories Burned"
            />
          </AreaChart>
        )}
      </ResponsiveContainer>
    </div>
  );
};

export default InteractiveProgressChart;
