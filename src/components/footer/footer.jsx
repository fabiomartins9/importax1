'use client'

import React from 'react';
import { Layout } from "antd";

import "./footer.css"

const { Footer } = Layout;

const CustomFooter = () => {
 

  return (
    <Footer className={`text-center bg-gray-500 text-white fixed-footer h-12`} id='fixed-footer'>
      Importax ©{new Date().getFullYear()} Criado por Fabio Martins
    </Footer>
  );
};

export { CustomFooter };
