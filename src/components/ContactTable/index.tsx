import React from 'react';
import ContactTable from './partials/props';
import Footer from '../Footer';
import Header from '../Header';

const ImportantNumbers: React.FC = () => {
  const contacts = [
    { name: 'Clínica', number: '55 43 31335050' },
    { name: 'Tatielly Stolber', number: '55 43 99187972' },
    { name: 'Karina Carvalho', number: '55 44 88019581' },
  ];

  return (
    <div>
      <Header />
      <ContactTable contacts={contacts} />
      <Footer />
    </div>
  );
};

export default ImportantNumbers;