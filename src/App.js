import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InvoicePage from "./pages/InvoicePage";
import Landing2 from "./pages/Landing2"
import Contact from "./pages/Contact"
import Dashboard from "./pages/Dashboard";
import Customers from "./pages/Customers";
import Login from "./pages/Login";
import Password from "./pages/Password";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import MyDocuments from "./pages/MyDocuments";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password" element={<Password />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/my-documents" element={<MyDocuments />} />
        <Route path="/customer" element={<Customers/>} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/bill" element={<InvoicePage />} />
      </Routes>
    </Router>
  );
}

export default App;
