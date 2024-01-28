"use client";

import React, { useState, useEffect } from "react";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFContent from "@/components/pdfContent/pdfContent";
import { Table, Button } from "antd";

import "./table.css";

export default function TableResult({ dataSource }) {
  const currentDate = new Date();

  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Criar o nome do arquivo com a data e hora atual
  const fileName =
    currentDate
      .toLocaleString("default", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      })
      .replace(/[/ :]/g, "") + ".pdf";

  const columns = [
    {
      title: "Descricao",
      dataIndex: "name",
      key: "1",
      width: 200,
    },
    {
      title: "Data",
      dataIndex: "date",
      key: "2",
      width: 300,
    },

    {
      title: "CUST. TAXA IMPORT. (R$)",
      dataIndex: "custoTaxImport",
      key: "4",
      width: 200,
    },
    {
      title: "ICMS (R$)",
      dataIndex: "custoTaxaIcms",
      key: "icms",
      width: 200,
    },
    {
      title: "IOF (R$)",
      dataIndex: "custoTaxaIof",
      key: "5",
      width: 200,
    },
    {
      title: "TOTAL IMPOSTOS (R$)",
      dataIndex: "valorTotalTributos",
      key: "6",
      width: 200,
    },
    {
      title: "CUSTO FINAL PRODUTO (R$)",
      dataIndex: "valorTotalCompra",
      key: "7",
      width: 200,
    },

    {
      title: "Cotação",
      dataIndex: "cotacao",
      key: "9",
      width: 100,
    },
  ];

  return (
    <div className="table-component">
      <Table
        scroll={true}
        id="table"
        pagination={{ pageSize: 3 }}
        dataSource={dataSource}
        columns={columns}
        size="small"
      />
      {isClient ? (
        <div className="flex flex-row items-center justify-center mb-4">
          {/* Adicionar um botão para baixar a tabela em PDF */}
          <PDFDownloadLink
            document={<PDFContent data={dataSource} />}
            fileName={fileName}
          >
            {({ blob, url, loading, error }) => (
              <Button
                style={{ marginTop: "10px" }}
                disabled={loading}
                className="bg-blue-500 text-white m-2  hover:bg-gray-200"
              >
                {loading ? "Gerando PDF..." : "Baixar Tabela em PDF"}
              </Button>
            )}
          </PDFDownloadLink>
        </div>
      ) : null}
    </div>
  );
}
