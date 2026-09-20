import { headers } from "next/headers";
import { prisma } from "@/lib/prisma";
import QRCode from "../QRCode";

export default async function CarteiraPorNumero({
  params,
}: {
  params: Promise<{ numero: string }>;
}) {
  const { numero } = await params;

  const estudante = await prisma.estudante.findUnique({
    where: {
      numeroCarteira: numero,
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
            Não foi encontrada uma carteira com este número.
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

  const headersList = await headers();

  const host = headersList.get("host");
  const protocol = headersList.get("x-forwarded-proto") || "https";

  const urlValidacao = `${protocol}://${host}/validar?numero=${estudante.numeroCarteira}`;

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          <div className="bg-blue-700 text-white p-6 text-center">
            <div className="text-5xl mb-3">
              🎓
            </div>

            <h1 className="text-2xl font-bold">
              CARTEIRA DO ESTUDANTE
            </h1>

            <p className="text-blue-100 mt-1">
              Identificação Estudantil Digital
            </p>
          </div>

          <div className="p-6">

            <div className="flex justify-center mb-6">
              {estudante.foto ? (
                <img
                  src={estudante.foto}
                  alt={`Foto de ${estudante.nome}`}
                  className="w-32 h-32 object-cover rounded-2xl"
                />
              ) : (
                <div className="w-32 h-32 bg-gray-200 rounded-2xl flex items-center justify-center text-5xl">
                  👤
                </div>
              )}
            </div>

            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">
                {estudante.nome}
              </h2>

              <span
                className={`inline-block mt-2 px-4 py-1 rounded-full text-sm font-bold ${
                  estudante.status === "APROVADO"
                    ? "bg-green-100 text-green-700"
                    : estudante.status === "REJEITADO"
                    ? "bg-red-100 text-red-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {estudante.status === "APROVADO"
                  ? "✓ APROVADO"
                  : estudante.status === "REJEITADO"
                  ? "✕ REJEITADO"
                  : "PENDENTE"}
              </span>
            </div>

            <div className="space-y-4">

              <div className="border-b pb-3">
                <p className="text-sm text-gray-500">
                  Número da carteira
                </p>

                <p className="font-bold text-gray-800">
                  {estudante.numeroCarteira || "Não definido"}
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

            {estudante.status === "APROVADO" &&
              estudante.numeroCarteira && (
                <QRCode valor={urlValidacao} />
              )}

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