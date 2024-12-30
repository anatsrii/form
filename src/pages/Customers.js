import React  from "react";
import { AccountSettingsProvider } from '../context/AccountSettingsContext.js';
import Sidebar from "../components/Sidebar";
import CustomerProfile from "../components/CustomerProfile.js";
import CustomerSettings from "../components/CustomerSettings.js";


function Customers() {
  return (
    <AccountSettingsProvider>
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <CustomerProfile />
          <CustomerSettings />
        </div>
      </div>
    </AccountSettingsProvider>
  );
}

export default Customers;