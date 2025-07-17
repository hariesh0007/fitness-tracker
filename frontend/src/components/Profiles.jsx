import React, { useState } from 'react';

const Profiles = ({ currentProfile, setCurrentProfile, profiles, setProfiles }) => {
  const [newProfileName, setNewProfileName] = useState('');

  const addProfile = () => {
    if (!newProfileName.trim()) return;
    if (profiles.find(p => p.name === newProfileName.trim())) {
      alert('Profile name already exists');
      return;
    }
    const newProfile = { id: Date.now(), name: newProfileName.trim() };
    setProfiles([...profiles, newProfile]);
    setCurrentProfile(newProfile);
    setNewProfileName('');
  };

  return (
    <div>
      <h2>User Profiles</h2>

      <input
        type="text"
        placeholder="New profile name"
        value={newProfileName}
        onChange={(e) => setNewProfileName(e.target.value)}
      />
      <button onClick={addProfile}>Add Profile</button>

      <h3>Switch Profile</h3>
      <ul>
        {profiles.map(profile => (
          <li key={profile.id} style={{ marginBottom: '6px' }}>
            <button
              style={{ fontWeight: currentProfile?.id === profile.id ? 'bold' : 'normal' }}
              onClick={() => setCurrentProfile(profile)}
            >
              {profile.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profiles;
