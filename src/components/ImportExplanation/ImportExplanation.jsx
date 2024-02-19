import React from 'react';

const ImportExplanation = () => {
  return (
    <div className="container mx-auto p-10 text-justify mb-4">
      <strong><h2 className="text-4xl font-bold mb-8">Importação Currier:</h2></strong>
      <p>
        Quando se trata de importação, o termo "currier" geralmente se refere ao serviço de courier, que é uma empresa especializada no transporte internacional de documentos, encomendas e mercadorias. Essas empresas oferecem serviços de transporte expresso, entregando itens de forma rápida e segura em todo o mundo. Os serviços de courier são frequentemente utilizados para importar mercadorias de forma rápida e eficiente, especialmente para itens de alto valor ou que precisam ser entregues dentro de prazos apertados.
      </p><br/>
      <strong><h2>Descrição dos Impostos:</h2></strong>
      <p><br/>
        <strong>ICMS (Imposto sobre Circulação de Mercadorias e Serviços):</strong> O ICMS é um imposto estadual brasileiro que incide sobre a circulação de mercadorias e serviços. Cada estado tem sua própria alíquota de ICMS, e a alíquota aplicada na importação depende da Unidade da Federação (UF) de destino da mercadoria. É cobrado sobre o valor da mercadoria importada, incluindo o valor do frete.
      </p><br/>
      <p>
        <strong>IOF (Imposto sobre Operações Financeiras):</strong> O IOF é um imposto federal brasileiro que incide sobre diversas operações financeiras, incluindo operações de câmbio. Na importação, o IOF é aplicado sobre o valor da moeda estrangeira utilizada na transação, sendo geralmente cobrado no momento da conversão da moeda para o real.<br/><br/>
      </p><br/>
      <strong><h2>Demonstração da Calculadora de Custos de Importação:</h2></strong><br/>
      <p>
        A calculadora de custos de importação permite calcular os custos associados à importação de mercadorias com base em diversos fatores, como o valor declarado da mercadoria, o valor do frete, as taxas de importação, entre outros. Vou guiá-lo através do processo de utilização da calculadora:
      </p><br/>
      <ol>
        <li><strong>Preenchimento dos Campos:</strong> No formulário apresentado, você deve preencher os campos relevantes com as informações necessárias, como o nome, a data da importação, a UF (Unidade da Federação) para determinar a alíquota do ICMS, a cotação da moeda em relação ao dólar, o valor declarado da mercadoria e o valor do frete.</li><br/>
        <li><strong>Cálculo dos Custos:</strong> Após preencher os campos, clique no botão "Calcular". A calculadora irá processar as informações fornecidas e calculará os custos de importação, incluindo taxas de importação, impostos como o ICMS e o IOF, além de possíveis taxas de courier.</li><br/>
        <li><strong>Visualização dos Resultados:</strong> Os resultados dos cálculos serão exibidos na tabela abaixo do formulário. Você verá informações detalhadas sobre os custos de importação, incluindo o valor dos impostos, o valor total dos tributos e o valor total da compra.</li><br/>
        <li><strong>Limpeza dos Resultados:</strong> Se desejar limpar os resultados e recomeçar, basta clicar no botão "Limpar".</li><br/>
      </ol><br/>
      <p>
        Essa calculadora simplifica o processo de estimativa dos custos envolvidos na importação de mercadorias, fornecendo aos usuários uma visão clara e detalhada dos impostos e taxas associados, ajudando-os a tomar decisões informadas sobre suas importações.
      </p>
    </div>
  );
}

export default ImportExplanation;
