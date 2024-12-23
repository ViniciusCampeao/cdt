import React from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import PaymentForm from "../components/Payment";

const PaymentPage: React.FC = () => {
  const handleSubmit = () => { 
    
  };
  return (
    <div>
      <Header />
        <PaymentForm onSubmit={handleSubmit} />
      <Footer />
    </div>
  );
};

export default PaymentPage;
