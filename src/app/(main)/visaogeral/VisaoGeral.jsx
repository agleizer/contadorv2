"use client";

import PlotlyChart from "@/app/(main)/visaogeral/visaoGeral-components/graficoBarrasDinamico";
import React, { useState, useEffect } from 'react';


function EstatisticaGeral(props) {
  return (
    <div className='grid justify-items-center'>
      <p className="font-extrabold text-black">{props.numero}</p>
      <p className='font-bold text-sm' class="estatistica-texto">{props.nome}</p>
    </div>
  )
}

function GraficoBarras(props) {
  return (
    <div className="flex-col justify-center mx-4 outline outline-slate-100 outline-offset-8 rounded">
      <div className="flex justify-between">
        <div className="mb-4">{props.nome}</div>
        <div>
          <p>...</p>
        </div>
      </div>
      <div className="flex justify-center">
        <img className="w-full" src={props.imagem} />
      </div>
    </div>
  );
}



// Função para buscar os dados
const getDados = async () => {
  try {
    const res = await fetch("http://localhost:3000/api/dados", {
      cache: "no-store",
    });

    if (!res.ok) {
      throw new Error("Failed to fetch dados");
    }

    const response = await res.json();
    return response.dados[0]; // Ajuste aqui para pegar o primeiro elemento do array 'dados'
  } catch (error) {
    console.log("Error loading dados: ", error);
    return null;
  }
};

// Componente VisaoGeral
export default function VisaoGeral() {
  const [dados, setDados] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getDados();
      console.log(data); // Para depuração
      if (data) {
        setDados(data);
      }
    };
    fetchData();
  }, []);

  if (!dados || !dados.estatisticas || !dados.graficoLocal || !dados.graficoDiasSemana) {
    return <div className="relative z-7 mt-14 w-full pt-4 pl-80 pr-[60px]">Carregando...</div>;
  }

  // Dados foram carregados e são válidos
  const { vetorXGeral, vetorYGeral, estatisticas, graficoLocal, graficoDiasSemana } = dados;

  return (
    <div id="conteudo" className="relative z-7 mt-14 w-full pt-4 pl-80 pr-[60px]">
      <div outline outline-slate-100 outline-offset-8 rounded>
        {console.log("esse é o vetor geral", vetorXGeral)}
        <PlotlyChart
          nome={"TOTAL DIÁRIO - últimos 14 dias"}
          vetorX={vetorXGeral}
          vetorY={vetorYGeral}
          orientacao={"v"}
        />
      </div>
      <div className="flex justify-around items-center mb-12">
        <EstatisticaGeral
          numero={estatisticas.mediaMensal}
          nome={"Média mensal"}
        />
        <EstatisticaGeral
          numero={estatisticas.mediaSemanal}
          nome={"Média semanal"}
        />
        <EstatisticaGeral
          numero={estatisticas.mediaDiaria}
          nome={"Média diária"}
        />
        <EstatisticaGeral
          numero={estatisticas.periodoTrafego}
          nome={"Período de maior tráfego"}
        />
      </div>
      <div className="grid grid-cols-2 gap-12">
        <PlotlyChart
          nome={"Por Local"}
          vetorX={graficoLocal.vetorXLocal}
          vetorY={graficoLocal.vetorYLocal}
          orientacao={"h"}
        />
        <PlotlyChart
          nome={"Por Dia da Semana"}
          vetorX={graficoDiasSemana.vetorXDias}
          vetorY={graficoDiasSemana.vetorYDias}
          orientacao={"h"}
        />
        <GraficoBarras
          nome={"Analítico"}
          imagem={"/graficos/grafico_analitico.png"}
        />
      </div>
    </div>
  );
}