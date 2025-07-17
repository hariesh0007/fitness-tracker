import React from 'react';

const Analytics = ({ bmi, fatPercentage, sleepRecords = [], workoutsLogged = [] }) => {
  const suggestions = [];

  
  if (bmi !== undefined && bmi !== null) {
    if (bmi < 18.5) {
      suggestions.push('Your BMI indicates you are underweight. Consider a nutrition-rich diet to gain healthy weight.');
    } else if (bmi >= 18.5 && bmi < 25) {
      suggestions.push('Your BMI is normal. Keep maintaining a balanced lifestyle!');
    } else if (bmi >= 25 && bmi < 30) {
      suggestions.push('Your BMI is slightly above normal. Focus on fat loss with cardio and strength training.');
    } else {
      suggestions.push('Your BMI indicates obesity. It is recommended to follow a structured fat loss program.');
    }
  }

  if (fatPercentage !== undefined && fatPercentage !== null) {
    if (fatPercentage > 25) {
      suggestions.push('High body fat detected. Include regular strength training and cardio workouts.');
    } else if (fatPercentage >= 18 && fatPercentage <= 25) {
      suggestions.push('Body fat percentage is within a healthy range. Maintain your current routine.');
    } else {
      suggestions.push('Low body fat percentage. Ensure adequate nutrition and strength training.');
    }
  }

  
  if (sleepRecords.length > 0) {
    const totalSleep = sleepRecords.reduce((sum, record) => sum + parseFloat(record.hours || 0), 0);
    const avgSleep = totalSleep / sleepRecords.length;
    if (avgSleep < 7) {
      suggestions.push('Try to get 7-9 hours of sleep nightly for optimal recovery.');
    } else {
      suggestions.push('Great sleep habits! Keep it up.');
    }
  }


  if (workoutsLogged.length > 0) {
    suggestions.push(`You have logged ${workoutsLogged.length} workouts. Consistency is key to progress!`);
  } else {
    suggestions.push('Try to log your workouts regularly to track your progress.');
  }

  return (
    <div>
      <h2>📊 Advanced Analytics & Suggestions</h2>
      {suggestions.length === 0 ? (
        <p>No data available to analyze yet.</p>
      ) : (
        <ul>
          {suggestions.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Analytics;
