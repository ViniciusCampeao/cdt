import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { init } from "@emailjs/browser";
import Home from "./pages/Init";
import PaymentPage from "./pages/PaymentPage";
import Thanks from "./pages/Thanks";
import Planilha from "./pages/Spreadsheet";
import LoginPage from "./pages/LoginPage";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Dashboard from "./pages/Dashboard";
import Extract from "./pages/Extract";
import ImportantNumbers from "./components/ContactTable";
import DoctorsContact from "./components/Doctors/partials/DoctorsProps";
import ChatWithHuggingFace from "./components/ChatIA";
import WhatsAppBot from "./components/WhatsAppBot";
import Instrucoes from "./components/Instrucoes/index.tsx";
import Vpn from "./components/VPN/index.tsx";
import APK from "./components/APK/index.tsx";
import ContactList from "./components/ContactList";
import PhoneToTim from "./components/Extract/ToTim.tsx";
import AddDataComponent from "./components/AddData/index.tsx";
import CardChecker from "./components/CardChecker/index.tsx";
import AddressLookup from "./components/AddressLookup/index.tsx";
import DocSend from "./components/DocSend/cardManager.tsx";
import DocumentUploader from "./components/DocSend/documentUploader.tsx";
import FileToPdfConverter from "./components/PdfConvert/index.tsx";
import Sales from "./components/Sales/index.tsx";
import ADMDASH from "./components/AdmDash/index.tsx";
import AddSeller from "./components/AddSale/index.tsx";
import PvdDashboard from "./components/PvdSales/index.tsx";
import CallRegister from "./components/CallRegister/index.tsx";

init("PH7ve0_A2N2UWzCRI");

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/thank-you" element={<Thanks />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/planilha" element={<Planilha />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctors" element={<DoctorsContact />} />
        <Route path="/extract" element={<Extract />} />
        <Route path="/importantNumbers" element={<ImportantNumbers />} />
        <Route path="/chatIA" element={<ChatWithHuggingFace />} />
        <Route path="/BotWPP" element={<WhatsAppBot />} />
        <Route path="/instrucoes" element={<Instrucoes />} />
        <Route path="/Vpn" element={<Vpn />} />
        <Route path="/Apk" element={<APK />} />
        <Route path="/contactList" element={<ContactList />} />
        <Route path="/tim" element={<PhoneToTim />} />
        <Route path="/add-data" element={<AddDataComponent />} />
        <Route path="/cardChecker" element={<CardChecker />} />
        <Route path="/addressLookup" element={<AddressLookup />} />
        <Route path="/docSend" element={<DocSend />} />
        <Route path="/cards/:cardId" element={<DocumentUploader />} />
        <Route path="/pdfConvert" element={<FileToPdfConverter />} />
        <Route path="/sales" element={<Sales />} />
        <Route path="/dash" element={<ADMDASH />} />
        <Route path="/addsale" element={<AddSeller />} />
        <Route path="/pvddash" element={<PvdDashboard />} />
        <Route path="/call" element={<CallRegister />} />
      </Routes>
    </Router>
  );
};

export default App;
