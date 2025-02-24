import React, { useState } from 'react';
import AboutCard from './partials/AboutCard';
import image from '../../assets/images/familia.png';

const AboutComponent: React.FC = () => {
  const [openCardIndex, setOpenCardIndex] = useState<number | null>(null);

  const cards = [
    { title: 'Saúde', content: 'Com o Cartão de TODOS, cuidar da saúde ficou muito mais fácil e acessível. As consultas médicas possuem valores fixos, sendo apenas R$ 30 para clínico geral e R$ 40 para outras especialidades, permitindo que você e sua família tenham atendimento de qualidade sem comprometer o orçamento. Além disso, é possível obter até 70% de desconto em exames laboratoriais e de imagem, garantindo preços reduzidos para os cuidados essenciais. Os benefícios também se estendem à odontologia, com até 70% de desconto em procedimentos odontológicos, proporcionando um sorriso saudável para toda a família.' },
    { title: 'Cashback', content: 'Receba até 20% de cashback em compras realizadas em lojas parceiras físicas, regionais e online. Economize enquanto gasta e aproveite as vantagens de ter parte do seu dinheiro de volta!' },
    { title: 'Familiar', content: 'O plano familiar é válido para até 7 pessoas pelo mesmo valor! Inclui cônjuge, filhos de até 21 anos e pais acima de 81 anos. Ideal para garantir o bem-estar de toda a família, com descontos em farmácias, restaurantes, exames, consultas e estudo.' },
    { title: 'Estudo', content: 'Invista no seu futuro e no dos seus filhos com cursos e programas educacionais de qualidade. Parceria com o Refuturiza para capacitação profissional e desenvolvimento pessoal, preparando você para o mercado de trabalho totalmente gratuito!' },
  ];

  const handleToggleCard = (index: number) => {
    setOpenCardIndex(openCardIndex === index ? null : index);
  };

  return (
    <div className="flex min-h-screen flex-col md:flex-row md:px-10 px-2 pb-4 bg-gray-100 font-mono">
      <div className="md:flex-1 flex items-center justify-center">
        <img src={image} alt="Imagem Familia" className="w-3/5 rounded-full object-cover border-4 border-green-400 mt-3" />
      </div>
      <div className="md:flex-1 mt-4 flex flex-col items-start justify-center text-center">
        <h2 className="text-4xl font-mono text-green-700 mb-8 w-full">Benefícios</h2>
        <div className="space-y-4 w-full">
          {cards.map((card, index) => (
            <AboutCard
              key={index}
              title={card.title}
              content={card.content}
              isOpen={openCardIndex === index}
              onClick={() => handleToggleCard(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutComponent;
