import React, { useState } from 'react';

const PRESET_FOOD_CALORIES = {
  Apple: 52,
  Banana: 89,
  Bread: 265,
  Rice: 130,
  Chicken: 239,
  'Orange Juice': 45,
};

const CalorieMonitor = ({ onCaloriesUpdate }) => {
  const [date, setDate] = useState('');
  const [foodItem, setFoodItem] = useState('');
  const [quantity, setQuantity] = useState('');
  
  
  const [customFoods, setCustomFoods] = useState([]);
  

  const [newFoodName, setNewFoodName] = useState('');
  const [newFoodCalories, setNewFoodCalories] = useState('');
  
  
  const [foods, setFoods] = useState([]);
  
  const combinedFoodCalories = { ...PRESET_FOOD_CALORIES };
  
  customFoods.forEach(({ name, calories }) => {
    combinedFoodCalories[name] = calories;
  });

  const totalCalories = foods.reduce((sum, f) => sum + f.calories, 0);

  const addFoodToList = () => {
    if (!foodItem) {
      alert('Please select a food item');
      return;
    }
    if (!quantity || isNaN(quantity) || quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }
    const calPer100 = combinedFoodCalories[foodItem];
    if (!calPer100) {
      alert('Calories info missing');
      return;
    }
    const calories = (calPer100 * parseFloat(quantity)) / 100;

    setFoods((prev) => {
      const existingIndex = prev.findIndex(f => f.food === foodItem);
      if (existingIndex >= 0) {
        const updated = [...prev];
        const newQty = updated[existingIndex].quantity + parseFloat(quantity);
        updated[existingIndex] = { food: foodItem, quantity: newQty, calories: (calPer100 * newQty) / 100 };
        return updated;
      }
      return [...prev, { food: foodItem, quantity: parseFloat(quantity), calories }];
    });

    setFoodItem('');
    setQuantity('');
  };

 
  const addCustomFood = () => {
    const name = newFoodName.trim();
    const calories = parseFloat(newFoodCalories);
    if (!name) {
      alert('Enter a food name');
      return;
    }
    if (!calories || calories <= 0) {
      alert('Enter valid calories per 100g/ml');
      return;
    }
    
    if (combinedFoodCalories[name]) {
      alert('Food already exists in the list');
      return;
    }
    setCustomFoods(prev => [...prev, { name, calories }]);
    setNewFoodName('');
    setNewFoodCalories('');
    alert(`Custom food "${name}" added!`);
  };

 
  const removeCustomFood = (name) => {
    const confirmRemove = window.confirm(`Remove custom food "${name}"? This will also remove it from added foods.`);
    if (!confirmRemove) return;

   
    setCustomFoods(prev => prev.filter(food => food.name !== name));
   
    setFoods(prev => prev.filter(f => f.food !== name));
  };

  const submitCalories = () => {
    if (!date) {
      alert('Please select a date');
      return;
    }
    if (foods.length === 0) {
      alert('Please add at least one food');
      return;
    }
    
    alert(`Submitted ${Math.round(totalCalories)} calories for ${date}`);
    setFoods([]);
    setDate('');
  };

  return (
    <div style={{ maxWidth: 480, margin: 'auto', padding: 20, background: '#f9f9f9', borderRadius: 8 }}>
      <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Calorie Monitor</h2>
      
      <label>
        Date:
        <input
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 8, margin: '10px 0 20px' }}
        />
      </label>

      <div style={{ display: 'flex', gap: 10, marginBottom: 12 }}>
        <select
          value={foodItem}
          onChange={e => setFoodItem(e.target.value)}
          style={{ flexGrow: 1, padding: 8 }}
        >
          <option value="">Select food</option>
          {Object.keys(combinedFoodCalories).map(food => (
            <option key={food} value={food}>{food}</option>
          ))}
        </select>
        <input
          type="number"
          min="0"
          placeholder="Quantity (g/ml)"
          value={quantity}
          onChange={e => setQuantity(e.target.value)}
          style={{ width: 120, padding: 8 }}
        />
        <button onClick={addFoodToList} style={{ padding: '8px 12px' }}>Add</button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <h3>Add Custom Food</h3>
        <input
          type="text"
          placeholder="Food name"
          value={newFoodName}
          onChange={e => setNewFoodName(e.target.value)}
          style={{ padding: 8, marginRight: 8, width: '45%' }}
        />
        <input
          type="number"
          min="0"
          placeholder="Calories per 100g/ml"
          value={newFoodCalories}
          onChange={e => setNewFoodCalories(e.target.value)}
          style={{ padding: 8, marginRight: 8, width: '35%' }}
        />
        <button onClick={addCustomFood} style={{ padding: '8px 12px' }}>Add Food</button>
      </div>

      {customFoods.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h4>Custom Foods (you can remove these):</h4>
          <ul>
            {customFoods.map(food => (
              <li key={food.name} style={{ display: 'flex', justifyContent: 'space-between', maxWidth: 400 }}>
                <span>{food.name} - {food.calories} cal/100g</span>
                <button
                  onClick={() => removeCustomFood(food.name)}
                  style={{ backgroundColor: 'red', color: 'white', border: 'none', borderRadius: 4, cursor: 'pointer' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}

      {foods.length > 0 && (
        <div style={{ marginBottom: 20 }}>
          <h3>Foods Added</h3>
          <ul>
            {foods.map(({ food, quantity, calories }, idx) => (
              <li key={idx}>
                {food} - {quantity}g/ml - {calories.toFixed(1)} cal
              </li>
            ))}
          </ul>
          <strong>Total Calories: {totalCalories.toFixed(1)}</strong>
        </div>
      )}

      <button onClick={submitCalories} disabled={!date || foods.length === 0} style={{ width: '100%', padding: 12 }}>
        Submit Calories
      </button>
    </div>
  );
};

export default CalorieMonitor;
