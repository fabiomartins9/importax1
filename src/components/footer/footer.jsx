'use client'

import React, { useState, useEffect } from 'react';
import { Layout } from "antd";

const { Footer } = Layout;

const CustomFooter = () => {
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) { // Ajuste este valor conforme necessário
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    // Adiciona o ouvinte de evento de rolagem
    window.addEventListener('scroll', handleScroll);

    // Limpa o ouvinte de evento quando o componente é desmontado
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <Footer className={`text-center bg-gray-500 text-white pt-4 block ${isFixed ? 'fixed w-full bottom-0' : ''}`}>
      Importax ©{new Date().getFullYear()} Criado por Fabio Martins
    </Footer>
  );
};

export { CustomFooter };
