import { prisma } from "@/lib/prisma";
import QRCode from "./QRCode";

export default async function Carteira() {
  const estudante = await prisma.estudante.findFirst({
    where: {
      status: "APROVADO",
    },
    orderBy: {
      id: "desc",
    },
  });

  if (!estudante) {
    return (
      <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full">
          <div className="text-5xl mb-4">🎓</div>

          <h1 className="text-2xl font-bold text-gray-800">
            Carteira não encontrada
          </h1>

          <p className="text-gray-500 mt-3">
            Nenhum estudante aprovado foi encontrado.
          </p>

          <a
            href="/"
            className="inline-block mt-6 bg-blue-700 hover:bg-blue-800 text-white font-semibold px-6 py-3 rounded-xl"
          >
            Voltar
          </a>
        </div>
      </main>
    );
  }

  const validade = estudante.validade
    ? new Date(estudante.validade).toLocaleDateString("pt-BR")
    : "Não definida";

  const urlValidacao = `/validar?numero=${estudante.numeroCarteira}`;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-blue-700 text-white p-6 text-center">
            <div className="text-5xl mb-3">🎓</div>

            <h1 className="text-2xl font-bold">
              CARTEIRA DO ESTUDANTE
            </h1>

            <p className="text-blue-100 mt-1">
              Identificação Estudantil Digital
            </p>
          </div>

          <div className="p-6">

            <div className="flex justify-center mb-6">
              <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center text-5xl">
                👤
              </div>
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {estudante.nome}
              </h2>

              <span className="inline-block mt-2 bg-green-100 text-green-700 px-4 py-1 rounded-full text-sm font-bold">
                ✓ APROVADO
              </span>
            </div>

            <div className="space-y-4">

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">
                  Número da carteira
                </p>

                <p className="font-bold text-gray-800">
                  {estudante.numeroCarteira}
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">
                  CPF
                </p>

                <p className="font-semibold text-gray-800">
                  {estudante.cpf}
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">
                  Instituição de ensino
                </p>

                <p className="font-semibold text-gray-800">
                  {estudante.instituicao}
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">
                  Curso
                </p>

                <p className="font-semibold text-gray-800">
                  {estudante.curso}
                </p>
              </div>

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">
                  Matrícula
                </p>

                <p className="font-semibold text-gray-800">
                  {estudante.matricula}
                </p>
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Validade
                </p>

                <p className="font-semibold text-gray-800">
                  {validade}
                </p>
              </div>

            </div>

            <QRCode valor={urlValidacao} />

          </div>

          <div className="border-t p-5 text-center text-sm text-gray-500">
            Carteira de Estudante Digital
            <br />
            Documento de identificação estudantil
          </div>

        </div>
      </div>
    </main>
  );
}
