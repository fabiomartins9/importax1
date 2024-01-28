'use client'

import { useState, useEffect } from "react";
import fetchCoins from "@/utils/fetchCoins";
import Image from "next/image";
import euaIcon from "../../../public/icons8-eua-48.png";
import ukIcon from "../../../public/icons8-emoji-reino-unido-48.png";
import ueIcon from "../../../public/icons8-emoji-da-união-europeia-48.png";
import { Spin } from 'antd';

export function Coins() {
  const [moedas, setMoedas] = useState({});

  const fetchMoedas = async () => {
    try {
      const data = await fetchCoins();
      setMoedas(data);
    } catch (error) {
      console.error("Erro ao buscar moedas:", error);
    }
  };

  // Chama a função de busca diretamente na renderização
  useEffect(() => {
    fetchMoedas();

    // Configura um intervalo para buscar moedas a cada 30 segundos
    const intervalId = setInterval(() => {
      fetchMoedas();
    }, 30000);

    // Limpa o intervalo quando o componente é desmontado
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Image src={euaIcon} alt="icone bandeira EUA" />
      {moedas.USD ? <p>{moedas.USD}</p> : <Spin />}
      

      <Image src={ukIcon} alt="icone bandeira GBP"/>
      {moedas.GBP ? <p>{moedas.GBP}</p> : <Spin />}

      <Image src={ueIcon} alt="icone bandeira EUR"/>
      {moedas.EUR ? <p>{moedas.EUR}</p> : <Spin />}
    </>
  );
}
