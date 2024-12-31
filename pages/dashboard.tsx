import React, { useState, useEffect } from 'react';

const SchoolDashboard: React.FC = () => (
  <div>
    <h2>School Dashboard</h2>
    <p>Manage your assignments, study schedules, and more!</p>
  </div>
);

const WorkDashboard: React.FC = () => (
  <div>
    <h2>Work Dashboard</h2>
    <p>Track projects, deadlines, and meetings.</p>
  </div>
);

const PersonalDashboard: React.FC = () => (
  <div>
    <h2>Personal Dashboard</h2>
    <p>Keep up with your habits, goals, and personal tasks.</p>
  </div>
);

const Dashboard: React.FC = () => {
  const [purpose, setPurpose] = useState<string | null>(null);

  // Load the purpose from localStorage when the component mounts
  useEffect(() => {
    const savedPurpose = localStorage.getItem('purpose');
    setPurpose(savedPurpose);
  }, []);

  if (!purpose) {
    return (
      <div>
        <p>Purpose not set. Please return to the onboarding screen.</p>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <h1>Your Dashboard</h1>
      {purpose === 'school' && <SchoolDashboard />}
      {purpose === 'work' && <WorkDashboard />}
      {purpose === 'personal' && <PersonalDashboard />}
    </div>
  );
};

export default Dashboard;
