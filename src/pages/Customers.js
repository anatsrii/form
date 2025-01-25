import React  from "react";
import Sidebar from "../components/Sidebar";
import CustomerProfile from "../components/CustomerProfile.js";
import CustomerSettings from "../components/CustomerSettings.js";


function Customers() {
  return (
      <div className="container">
        <Sidebar />
        <div className="mainContent">
          <CustomerProfile />
          <CustomerSettings />
        </div>
      </div>
  );
}

export default Customers;