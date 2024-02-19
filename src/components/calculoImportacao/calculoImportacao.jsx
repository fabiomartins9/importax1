"use client"; // This is a client component 👈🏽

import React, { useState, useEffect, useContext, useRef } from "react";
import TableResult from "@/components/table/table"; 
//import "./page.css";

import {  Form, Button, Input, Tooltip } from "antd";
import CascaderUF from "@/components/cascader/cascader";
import { CoinsContext } from "@/context/coinsContext/coinsContext";
import  firebase  from "@/utils/firebase";
import "firebase/firestore";
import { QuestionCircleOutlined, } from "@ant-design/icons";
import InputMask from 'react-input-mask';
import ImportExplanation from "../ImportExplanation/ImportExplanation";

export default function ImpotPage() {
  const [icms, setIcms] = useState(0);
  const [precoReal, setPrecoReal] = useState(0);
  const [precoInvoice, setPrecoInvoice] = useState(0);
  const [frete, setFrete] = useState(0);

  const [configTaxBd, setConfigTaxBd] = useState([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");

  // Hook Obj resultados dos calculos
  const [custosImportacao, setCustosImportacao] = useState([]);

  const coins = useContext(CoinsContext);
  const [defaultValueSet, setDefaultValueSet] = useState(false);

  const [cotacao, setCotacao] = useState(coins.USD || "");

  

  const formRef = useRef(); // Crie uma referência para o formulário

  const db = firebase.firestore();

  // carrega as taxas do banco de dados
  useEffect(() => {
    async function getTax() {
      const taxa = await db.collection("tax");
      taxa.get().then((snapshot) => {
        if (snapshot.empty) {
          console.log("No matching documents.");
          return;
        }

        let taxValues = []; // Objeto para armazenar os valores

        snapshot.forEach((doc) => {
          const taxData = {
            importFee: doc.data().importFee,
            iof: doc.data().iof,
            currierFee: doc.data().currierFee,
          };

          taxValues.push(taxData);
        });

        setConfigTaxBd(taxValues);
        // Atualiza cotacao com o valor mais recente de coins.USD
        if (coins.USD !== 0 && !defaultValueSet) {
          formRef.current.setFieldsValue({ cotacao: coins.USD });
          setDefaultValueSet(true); // Define que o defaultValue foi configurado
        }
      });
    }

    getTax();

    const interval = setInterval(getTax, 60000);

    return () => clearInterval(interval);
  }, [coins.USD, defaultValueSet]);

  

  const handleFormChange = () => {
    const values = formRef.current.getFieldsValue(); // Obtenha os valores dos campos do formulário
    //setPrecoReal(values.valorCheio);
    setPrecoInvoice(parseFloat(values.valorDeclarado));
    setFrete(parseFloat(values.frete));
    setCotacao(parseFloat(values.cotacao));
    setName(values.name);
    setDate(values.date);
    
  };

  function calcular(precoInvoice, freteUsd) {
    try{
    // Verifica se as variáveis são números e existem
    if (
      //typeof precoReal === "number" &&
      typeof precoInvoice === "number" &&
      typeof freteUsd === "number" &&
      typeof cotacao === "number" &&
      !isNaN(precoInvoice) &&
      !isNaN(freteUsd) &&
      !isNaN(cotacao) &&
      configTaxBd.length > 0 // Verifica se configTaxBd possui pelo menos um elemento
    ) {
      const taxaImportacao = configTaxBd[0].importFee;
      const taxaIof = configTaxBd[0].iof;
      const taxaIcms = icms;
      const currierFee = configTaxBd[0].currierFee;

      // convertendo valores prod e ship em real
      const valorProdutoInvoiceBrl = precoInvoice * cotacao;
      
      const valorFreteBrl = freteUsd * cotacao;

      // soma valoresDeclarado  e frete e salva em valorProdutoInvoiceMaisFreteBrl
      const valorProdutoInvoiceMaisFreteBrl =
        valorProdutoInvoiceBrl + valorFreteBrl;

      // Aux para calc icms
      const custoTaxaImportacao =
        valorProdutoInvoiceMaisFreteBrl * (taxaImportacao / 100);

      // calc Iof
      const custoTaxaIof = valorProdutoInvoiceMaisFreteBrl * (taxaIof / 100);

      //formula icms
      const custoTaxaIcms =
        ((valorProdutoInvoiceMaisFreteBrl + custoTaxaImportacao) /((1 - taxaIcms / 100)) * (taxaIcms / 100));

        //valor total dos tributos
      const valorTotalTributos =
        custoTaxaImportacao + custoTaxaIcms + custoTaxaIof + currierFee;

      const valorTotalCompra =
        valorProdutoInvoiceMaisFreteBrl + valorTotalTributos;

      //const valorTotalProduto =
      //valorProdutoInvoiceMaisFreteBrl + (precoReal * cotacao);

      // Obj que será add no Hook custosImportacao []
      const costValue = [
        {
          name: name,
          date: date,
          custoTaxImport: custoTaxaImportacao && custoTaxaImportacao.toFixed(2),
          custoTaxaIcms: custoTaxaIcms && custoTaxaIcms.toFixed(2),
          custoTaxaIof: custoTaxaIof && custoTaxaIof.toFixed(2),
          valorTotalTributos:
            valorTotalTributos && valorTotalTributos.toFixed(2),
          valorTotalCompra: valorTotalCompra && valorTotalCompra.toFixed(2),
          //valorTotalProduto: valorTotalProduto && valorTotalProduto.toFixed(2),
          cotacao:cotacao,
          
        },
      ];
        
      setCustosImportacao((prevCustosImportacao) =>
        prevCustosImportacao.concat(costValue)
      );

      
    }
    
  else{
    console.log("Erro! importPage")
  }} catch(e){
        console.log("Error: ", e)
    } 
  }

  

  // Função que será chamada quando um item for selecionado no CascaderUF
  const handleSelect = (value, selectedOptions) => {
    setIcms(selectedOptions);
  };

  return (
    <di>
    <div className="flex flex-col md:flex-row gap-4 h-full  px-28">
      
    <div className="w-full md:w-1/2 flex flex-col">
    <Form ref={formRef} onValuesChange={handleFormChange} className="">
                {/* ref para referenciar o formulário */}
                <Form.Item label="Nome:" name="name"  className="w-full">
                  <Input  className="w-full bg-gray-200"
                  suffix={
                    <Tooltip title="Descrição do produto ou algo para diferenciar o pacote">
                      <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                    </Tooltip>
                  }
                  
                  
                  />
                </Form.Item>
                <Form.Item label="Data:" name="date">
                  
                  <InputMask className="w-full bg-gray-200"
                  mask="99/99/9999" // Defina a máscara desejada
                  maskChar="_" // Caractere de espaço reservado (pode ser qualquer caractere)
                 
                     >
                    {() => <Input placeholder="DD/MM/AAAA"  className=" bg-gray-200"/>}
                    
                  </InputMask>

                </Form.Item>
                <Form.Item label="UF:">
                  <CascaderUF onSelect={handleSelect} className="w-full bg-gray-200"/>
                  {/* Passando a função handleSelect como onSelect */}
                  <br />
                  <span>Valor da aliquota: {icms}%</span>
                </Form.Item>
                <Form.Item label="Cotação: " name="cotacao">
                  <Input placeholder="Cotação" 
                  min={1} 
                  step="0.01"
                  className="w-full bg-gray-200"
                  
                  suffix={
                    <Tooltip title="Valor da moeda considerada ex: Dolar 5,00">
                      <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                    </Tooltip>
                  }
                  
                  />
                </Form.Item>
                
                <Form.Item label="Valor:" name="valorDeclarado"
                
                >
                  <Input
                    type="number"
                    placeholder="Valor invoice"
                    min={1}
                    step="0.01"
                    className="w-full bg-gray-200"
                    
                    
                    suffix={
                      <Tooltip title="Valor declarado no invoice ou proforma sem o frete">
                        <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                      </Tooltip>
                    }
                  />
                </Form.Item>

            
                  
                <Form.Item label="Frete:" name="frete" className="flex-grow"
                
                >
                
                  <Input
                    type="number"
                    placeholder="Valor frete pago"
                    min={1}
                    step="0.01"
                    className="w-full bg-gray-200"
                   
                    suffix={
                      <Tooltip title="Preço do frete">
                        <QuestionCircleOutlined style={{ color: "rgba(0,0,0,.45)" }} />
                      </Tooltip>
                    }
                    />   
                </Form.Item>
                
                              
                <Form.Item>
                  
                <div className="flex justify-center items-center">
                    <Button
                      htmlType="submit"
                      onClick={() => {
                        calcular(precoInvoice, frete);
                      }}
                      className="bg-blue-500 text-white m-2  hover:bg-gray-200"
                    >
                      Calcular
                    </Button>
                    <Button

                      onClick={() => setCustosImportacao([])}
                      className="bg-red-600 text-white m-2 hover:bg-gray-200"
                    >
                      Limpar
                    </Button>
                  </div>
                </Form.Item>
              </Form>
    </div>
    <div className="w-full ">        
    <TableResult dataSource={[...custosImportacao]} className="bg-[#CCCCCC]" />
    </div>
    
</div>
<ImportExplanation/>          
</di>
  );
}