import React, { useState } from 'react';

const Challenges = () => {
  const [challenges, setChallenges] = useState([]);
  const [newChallenge, setNewChallenge] = useState('');
  const [completedIds, setCompletedIds] = useState([]);

  const addChallenge = () => {
    if (newChallenge.trim() === '') return;
    setChallenges([...challenges, { id: Date.now(), text: newChallenge }]);
    setNewChallenge('');
  };

  const toggleComplete = (id) => {
    setCompletedIds((prev) =>
      prev.includes(id) ? prev.filter((cid) => cid !== id) : [...prev, id]
    );
  };

  return (
    <div>
      <h2>Challenges & Rewards</h2>

      <input
        type="text"
        placeholder="New Challenge"
        value={newChallenge}
        onChange={(e) => setNewChallenge(e.target.value)}
      />
      <button onClick={addChallenge}>Add Challenge</button>

      <ul>
        {challenges.map(({ id, text }) => (
          <li key={id} style={{ margin: '8px 0' }}>
            <label style={{ textDecoration: completedIds.includes(id) ? 'line-through' : 'none' }}>
              <input
                type="checkbox"
                checked={completedIds.includes(id)}
                onChange={() => toggleComplete(id)}
              />
              {text}
            </label>
            {completedIds.includes(id) && <span> 🎉 Badge Earned!</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Challenges;

