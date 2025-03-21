import React from 'react';
import DoctorsTable from '../index';
import Header from '../../Header';
import Footer from '../../Footer';

const DoctorsContact: React.FC = () => {
  const Doctors = [
    { name: 'Ana Júlia De Souza Alfieri', especialidade: 'Angiologia (Vascular)', orientacoes: 'A partir de 18 anos.' },
    { name: 'Natalia Scaneiro Boy Sardinha', especialidade: 'Angiologia (Vascular)', orientacoes: 'A partir de 18 anos.' },
    { name: 'Marlozinho Pacheco de Freitas Camargo', especialidade: 'Cardiologia', orientacoes: 'Atendimento a partir de 15 anos.' },
    { name: 'Alessandra Carnevale Migliozzi', especialidade: 'Clínica Geral', orientacoes: 'A partir de 6 meses.' },
    { name: 'Gabrielli de Oliveira Morcelli', especialidade: 'Clínica Geral', orientacoes: 'Atendimentos a partir de 12 anos.' },
    { name: 'Mariana Guimarães', especialidade: 'Clínica Geral', orientacoes: 'Atendimentos a partir de 0 anos.' },
    { name: 'Mayara Carlos Kawashima', especialidade: 'Dermatologia', orientacoes: 'Atendimento a partir de 0 anos.' },
    { name: 'Amanda Karla da Silva', especialidade: 'Fisioterapia', orientacoes: 'Atendimentos a partir de 5 anos - não atende gestantes.' },
    { name: 'Gabriela da Silva Pereira', especialidade: 'Ginecologia', orientacoes: 'Após o primeiro ciclo menstrual.' },
    { name: 'Heloisa Picolotto Oliveira', especialidade: 'Ginecologia', orientacoes: 'Atendimento a partir de 13 anos' },
    { name: 'Melissa Muller', especialidade: 'Nutrição', orientacoes: 'Atendimento a partir de 5 meses.' },
    { name: 'Gabriel Rodrigues Carrijo', especialidade: 'Oftalmologia', orientacoes: 'Atendimento a partir de 12 anos.' },
    { name: 'Joanne Lopes Boaventura', especialidade: 'Oftalmologia', orientacoes: 'A partir de 8 anos.' },
    { name: 'Murillo Mendes de Almeida', especialidade: 'Oftalmologia', orientacoes: 'A partir de 5 anos.' },
    { name: 'Paulo Victor Crestani', especialidade: 'Oftalmologia', orientacoes: 'A partir de 5 anos - Realiza Mapeamento.' },
    { name: 'Amon Ramsyes Rodrigues Curcio', especialidade: 'Ortopedia e Traumatologia', orientacoes: 'Atendimento a partir de 0 anos.' },
    { name: 'Silvia Aparecida Mingotti', especialidade: 'Psicologia', orientacoes: 'A partir de 17 anos' },
    { name: 'Vanessa Melanda', especialidade: 'Psicologia', orientacoes: 'A partir de 4 anos - Terapia Cognitiva Comportamental.' },
    { name: 'Iara Bertozzi Alta', especialidade: 'Psiquiatria', orientacoes: 'A partir de 18 anos.' },
    { name: 'Guilherme de Moraes Pinto', especialidade: 'US', orientacoes: 'Realiza ultrassonografias.' },
  ];

  return (
    <div>
      <Header />
      <DoctorsTable doctors={Doctors} />
      <Footer />
    </div>
  );
};

export default DoctorsContact;
