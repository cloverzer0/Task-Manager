import React, { useState } from 'react';
import { useRouter } from 'next/router';

const Onboarding: React.FC = () => {
  const [purpose, setPurpose] = useState<string>('');
  const router = useRouter(); // Next.js router for navigation

  const handleSubmit = (): void => {
    if (!purpose) {
      alert('Please select a purpose!');
      return;
    }

    // Save purpose to local storage
    localStorage.setItem('purpose', purpose);
    router.push('/dashboard'); // Navigate to the dashboard
  };

  return (
    <div className="onboarding-container">
      <h1>Welcome! What will you use this app for?</h1>
      <div className="purpose-selection">
        <label>
          <input
            type="radio"
            value="school"
            checked={purpose === 'school'}
            onChange={(e) => setPurpose(e.target.value)}
          />
          School
        </label>
        <label>
          <input
            type="radio"
            value="work"
            checked={purpose === 'work'}
            onChange={(e) => setPurpose(e.target.value)}
          />
          Work
        </label>
        <label>
          <input
            type="radio"
            value="personal"
            checked={purpose === 'personal'}
            onChange={(e) => setPurpose(e.target.value)}
          />
          Personal
        </label>
      </div>
      <button onClick={handleSubmit}>Continue</button>
    </div>
  );
};

export default Onboarding;
