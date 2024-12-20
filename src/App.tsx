import React from "react";
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Home from "./pages/home";
import { init } from "@emailjs/browser";
import PaymentPage from "./pages/PaymentPage";
import Thanks from "./pages/Thanks";

init("PH7ve0_A2N2UWzCRI");

const App: React.FC = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/payment" element={<PaymentPage /> } />
          <Route path="/thank-you" element={<Thanks />} />
        </Routes>
    </Router>
  );
};

export default App;
