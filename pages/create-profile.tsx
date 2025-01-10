import React, { useState } from 'react';
import { useRouter } from 'next/router';

const CreateProfile: React.FC = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [age, setAge] = useState<number | ''>('');
  const [purpose, setPurpose] = useState<string>('');
  const [notifications, setNotifications] = useState<string>('none');
  const [theme, setTheme] = useState<string>('light');
  const router = useRouter();

  const handleSubmit = (): void => {
    if (!name || !email || !purpose) {
      alert('Please fill in all required fields!');
      return;
    }

    // Save user profile data to localStorage or send it to an API
    const profile = { name, email, age, purpose, notifications, theme };
    localStorage.setItem('profile', JSON.stringify(profile));

    // Navigate to the dashboard
    router.push('/dashboard');
  };

  return (
    <div className="create-profile-container">
      <h1>Create Your Profile</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div>
          <label>
            Name*:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Email*:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label>
            Age:
            <input
              type="number"
              value={age}
              onChange={(e) => setAge(Number(e.target.value))}
            />
          </label>
        </div>
        <div>
          <h3>Purpose*</h3>
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
        <div>
          <h3>Notification Preferences</h3>
          <select
            value={notifications}
            onChange={(e) => setNotifications(e.target.value)}
          >
            <option value="none">None</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        <div>
          <h3>Preferred Theme</h3>
          <select value={theme} onChange={(e) => setTheme(e.target.value)}>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="automatic">Automatic</option>
          </select>
        </div>
        <button type="button" onClick={handleSubmit}>
          Create Profile
        </button>
      </form>
    </div>
  );
};

export default CreateProfile;
