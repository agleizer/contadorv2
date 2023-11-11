import connectMongoDB from "libs/mongodb";
import Dados from "models/data"; // Certifique-se de que este é o caminho correto para o seu modelo de dados
import {NextResponse} from "next/server";

export async function POST(request) {
  // Extrair os dados do corpo da requisição
  const {
    vetorXGeral, vetorYGeral, estatisticas, graficoLocal, graficoDiasSemana
  } = await request.json();

  // Estabelecer conexão com o MongoDB
  await connectMongoDB();

  // Criar um novo documento na coleção 'Dados'
  await Dados.create({
    vetorXGeral, vetorYGeral, estatisticas, graficoLocal, graficoDiasSemana
  });

  // Enviar uma resposta JSON com uma mensagem de sucesso e status 201
  return NextResponse.json({ message: "Dados Created" }, { status: 201 });
}

export async function GET() {
  await connectMongoDB();
  const dados = await Dados.find();
  return NextResponse.json({ dados });
}
