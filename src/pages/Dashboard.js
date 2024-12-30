import React from 'react';
import '../style/dashboard.css'; 
import Sidebar from '../components/Sidebar';
import ProfileCard from '../components/ProfileCard';
import AccountSettings from '../components/AccountSettings';
import { AccountSettingsProvider } from '../context/AccountSettingsContext.js';

const Dashboard = () => {
  return (
    <AccountSettingsProvider>
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <ProfileCard />
          <AccountSettings />
        </div>
      </div>
    </AccountSettingsProvider>
  );
}

export default Dashboard;