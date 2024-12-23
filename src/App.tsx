import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { init } from "@emailjs/browser";
import Home from "./pages/Init";
import PaymentPage from "./pages/PaymentPage";
import Thanks from "./pages/Thanks";
import AdminDashboard from "./pages/AdminDashboard";
import Planilha from "./pages/Spreadsheet";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import Contact from "./pages/Contact";

init("PH7ve0_A2N2UWzCRI");

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<Thanks />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/planilha" element={<Planilha />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
};

export default App;
