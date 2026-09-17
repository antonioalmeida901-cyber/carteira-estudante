import { prisma } from "@/lib/prisma";

export default async function Validar({
  searchParams,
}: {
  searchParams: Promise<{ numero?: string }>;
}) {
  const params = await searchParams;
  const numero = params.numero;

  const estudante = numero
    ? await prisma.estudante.findUnique({
        where: {
          numeroCarteira: numero,
        },
      })
    : null;

  const carteiraValida =
    estudante &&
    estudante.status === "APROVADO" &&
    estudante.validade &&
    new Date(estudante.validade) >= new Date();

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div
            className={`p-8 text-white text-center ${
              carteiraValida ? "bg-green-600" : "bg-red-600"
            }`}
          >
            <div className="text-5xl mb-3">
              {carteiraValida ? "✓" : "✕"}
            </div>

            <h1 className="text-2xl font-bold">
              {carteiraValida
                ? "CARTEIRA VÁLIDA"
                : "CARTEIRA NÃO VÁLIDA"}
            </h1>

            <p className="mt-2">
              {carteiraValida
                ? "A carteira foi encontrada e está aprovada."
                : "Não foi possível validar esta carteira."}
            </p>
          </div>

          {carteiraValida && estudante && (
            <div className="p-6">

              <div className="text-center mb-6">

                <div className="w-28 h-28 bg-gray-200 rounded-2xl mx-auto flex items-center justify-center text-5xl mb-4">
                  👤
                </div>

                <h2 className="text-2xl font-bold text-gray-800">
                  {estudante.nome}
                </h2>

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
                    Instituição
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
                    {new Date(
                      estudante.validade!
                    ).toLocaleDateString("pt-BR")}
                  </p>
                </div>

              </div>

            </div>
          )}

          <div className="border-t p-5 text-center text-sm text-gray-500">
            Sistema de Validação da Carteira do Estudante
          </div>

        </div>

      </div>
    </main>
  );
}