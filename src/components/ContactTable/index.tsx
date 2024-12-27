import React from 'react';
import ContactTable from './partials/props';
import Footer from '../Footer';
import Header from '../Header';

const ImportantNumbers: React.FC = () => {
  const contacts = [
    { name: 'Clínica', number: '43 31335050' },
    { name: 'Tatielly Stolber', number: '43 99187972' },
    { name: 'Cleiton', number: ' 31 88999690' },
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