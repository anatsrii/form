import React from 'react';
import'../style/dashboard.css';
import Sidebar from '../components/Sidebar';
import Search from '../components/Search';
import Stats from '../components/Stats';

const MyDocuments = () => {
  return (
    <div className="container">
      <Sidebar />
      <div className="mainContent">
        <Stats />
        <Search />
      </div>
    </div>
  );
};

export default MyDocuments;