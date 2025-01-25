import React from 'react';
import '../style/dashboard.css'; 
import Sidebar from '../components/Sidebar';
import UserProfile from '../components/UserProfile.js';
import UserSettings from '../components/UserSettings.js';

const Dashboard = () => {
  return (
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <UserProfile />
          <UserSettings />
        </div>
      </div>
  );
}

export default Dashboard;