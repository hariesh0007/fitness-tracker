import React, { useState } from 'react';

const dietPlans = {
  'Weight Loss': {
    Vegetarian: [
      { food: 'Oatmeal with berries', calories: 150 },
      { food: 'Grilled tofu salad', calories: 300 },
      { food: 'Steamed vegetables with quinoa', calories: 350 },
      { food: 'Mixed nuts (small handful)', calories: 200 },
      { food: 'Green tea', calories: 0 },
    ],
    'Non-Vegetarian': [
      { food: 'Scrambled eggs with spinach', calories: 200 },
      { food: 'Grilled chicken breast with salad', calories: 350 },
      { food: 'Baked fish with steamed broccoli', calories: 400 },
      { food: 'Greek yogurt with almonds', calories: 150 },
      { food: 'Herbal tea', calories: 0 },
    ],
  },
  'Muscle Gain': {
    Vegetarian: [
      { food: 'Protein smoothie with plant protein', calories: 300 },
      { food: 'Chickpea curry with brown rice', calories: 450 },
      { food: 'Paneer stir-fry with vegetables', calories: 400 },
      { food: 'Peanut butter on whole grain bread', calories: 350 },
      { food: 'Milk or soy milk', calories: 120 },
    ],
    'Non-Vegetarian': [
      { food: 'Egg white omelette with veggies', calories: 250 },
      { food: 'Grilled salmon with sweet potatoes', calories: 500 },
      { food: 'Chicken and vegetable stir-fry', calories: 450 },
      { food: 'Cottage cheese (paneer) with nuts', calories: 350 },
      { food: 'Protein shake', calories: 200 },
    ],
  },
  'Maintain Weight': {
    Vegetarian: [
      { food: 'Whole wheat toast with avocado', calories: 250 },
      { food: 'Lentil soup with salad', calories: 400 },
      { food: 'Vegetable pasta', calories: 350 },
      { food: 'Fruit bowl', calories: 200 },
      { food: 'Herbal tea', calories: 0 },
    ],
    'Non-Vegetarian': [
      { food: 'Egg and veggie sandwich', calories: 300 },
      { food: 'Grilled chicken with mixed veggies', calories: 450 },
      { food: 'Fish tacos with salsa', calories: 400 },
      { food: 'Yogurt with honey and walnuts', calories: 250 },
      { food: 'Green tea', calories: 0 },
    ],
  },
};

const DietPlan = () => {
  const [goal, setGoal] = useState('');
  const [dietPref, setDietPref] = useState('');
  const [plan, setPlan] = useState(null);

  const generatePlan = () => {
    if (!goal || !dietPref) {
      alert('Please select your goal and diet preference');
      return;
    }
    setPlan(dietPlans[goal][dietPref]);
  };

  return (
    <div style={{ maxWidth: 500, margin: 'auto', fontFamily: 'Arial, sans-serif' }}>
      <h2>🍎 Personalized Diet Plan</h2>

      <label>
        Select Goal:
        <select value={goal} onChange={e => setGoal(e.target.value)}>
          <option value="">--Choose Goal--</option>
          <option value="Weight Loss">Weight Loss</option>
          <option value="Muscle Gain">Muscle Gain</option>
          <option value="Maintain Weight">Maintain Weight</option>
        </select>
      </label>

      <br /><br />

      <label>
        Diet Preference:
        <select value={dietPref} onChange={e => setDietPref(e.target.value)}>
          <option value="">--Choose Diet--</option>
          <option value="Vegetarian">Vegetarian</option>
          <option value="Non-Vegetarian">Non-Vegetarian</option>
        </select>
      </label>

      <br /><br />

      <button onClick={generatePlan} style={{ padding: '8px 16px', cursor: 'pointer' }}>
        Generate My Diet Plan
      </button>

      {plan && (
        <div style={{ marginTop: 20 }}>
          <h3>Your Diet Plan:</h3>
          <ul>
            {plan.map(({ food, calories }, i) => (
              <li key={i}>
                <strong>{food}</strong> — {calories} kcal
              </li>
            ))}
          </ul>
          <p><em>Note: Adjust portions based on your calorie needs.</em></p>
        </div>
      )}
    </div>
  );
};

export default DietPlan;
