import mongoose, { Schema } from "mongoose";

const dadosSchema = new Schema(
  {
    // Vetores gráfico geral
    vetorXGeral: [Number],
    vetorYGeral: [Number],

    // Variáveis estatísticas
    estatisticas: {
      mediaMensal: String,
      mediaSemanal: String,
      mediaDiaria: String,
      periodoTrafego: String
    },

    // Vetores gráfico por local
    graficoLocal: {
      vetorXLocal: [Number],
      vetorYLocal: [String]
    },

    // Vetores gráfico dias da semana
    graficoDiasSemana: {
      vetorXDias: [Number],
      vetorYDias: [String]
    }
  },
  {
    timestamps: true,
  }
);

const Dados = mongoose.models.Dados || mongoose.model("Dados", dadosSchema);

export default Dados;
