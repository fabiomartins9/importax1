// utils/fetchCoins.js

const fetchCoins = async () => {
    const baseUrl = 'https://economia.awesomeapi.com.br';
  
    try {
      const responseUSD = await fetch(`${baseUrl}/last/USD-BRL`);
      const responseEUR = await fetch(`${baseUrl}/last/EUR-BRL`);
      const responseGBP = await fetch(`${baseUrl}/last/GBP-BRL`);
  
      const dataUSD = await responseUSD.json();
      const dataEUR = await responseEUR.json();
      const dataGBP = await responseGBP.json();
  
      const moedas = {
        USD: Number(dataUSD.USDBRL.high).toFixed(2),
        EUR: Number(dataEUR.EURBRL.high).toFixed(2),
        GBP: Number(dataGBP.GBPBRL.high).toFixed(2),
      };
  
      return moedas;
    } catch (error) {
      console.error('Error fetching data:', error);
      return {};
    }
  };
  
  export default fetchCoins;
  