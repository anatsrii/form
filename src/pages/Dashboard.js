import React from 'react';
import '../style/dashboard.css'; 
import Sidebar from '../components/Sidebar';
import { AccountSettingsProvider } from '../context/AccountSettingsContext.js';
import Stats from '../components/Stats.js';
import UserProfile from '../components/UserProfile.js';
import UserSettings from '../components/UserSettings.js';

const Dashboard = () => {
  return (
    <AccountSettingsProvider>
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <UserProfile />
          <Stats />
          <UserSettings />
        </div>
      </div>
    </AccountSettingsProvider>
  );
}

export default Dashboard;