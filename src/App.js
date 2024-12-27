import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicePage from "./components/InvoicePage";
import Landing2 from "./pages/Landing2"

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing2 />} />
        <Route path="/invoice" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
