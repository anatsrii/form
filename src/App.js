import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicePage from "./pages/InvoicePage";
import Landing2 from "./pages/Landing2"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing2 />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
