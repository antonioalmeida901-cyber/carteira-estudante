export const dynamic = "force-dynamic";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import AprovarButton from "./AprovarButton";
import RejeitarButton from "./RejeitarButton";

export default async function Admin() {
  const cookieStore = await cookies();
  const adminLogado = cookieStore.get("admin_logado");

  if (adminLogado?.value !== "true") {
    redirect("/login");
  }

  const estudantes = await prisma.estudante.findMany({
    orderBy: {
      criadoEm: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto">

        <div className="mb-6 flex justify-between items-center">
          <a
            href="/"
            className="text-blue-700 font-semibold hover:underline"
          >
            ← Voltar
          </a>

          <a
            href="/api/logout"
            className="text-red-600 font-semibold hover:underline"
          >
            Sair
          </a>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-blue-700 text-white p-8">
            <h1 className="text-3xl font-bold">
              Área Administrativa
            </h1>

            <p className="mt-2 text-blue-100">
              Estudantes cadastrados
            </p>
          </div>

          <div className="p-6">

            {estudantes.length === 0 ? (
              <p className="text-gray-500">
                Nenhum estudante cadastrado.
              </p>
            ) : (
              <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                  <thead>
                    <tr className="border-b">
                      <th className="text-left p-3">Nome</th>
                      <th className="text-left p-3">CPF</th>
                      <th className="text-left p-3">Instituição</th>
                      <th className="text-left p-3">Curso</th>
                      <th className="text-left p-3">Matrícula</th>
                      <th className="text-left p-3">Status</th>
                      <th className="text-left p-3">Ação</th>
                    </tr>
                  </thead>

                  <tbody>
                    {estudantes.map((estudante) => (
                      <tr
                        key={estudante.id}
                        className="border-b hover:bg-gray-50"
                      >

                        <td className="p-3">
                          {estudante.nome}
                        </td>

                        <td className="p-3">
                          {estudante.cpf}
                        </td>

                        <td className="p-3">
                          {estudante.instituicao}
                        </td>

                        <td className="p-3">
                          {estudante.curso}
                        </td>

                        <td className="p-3">
                          {estudante.matricula}
                        </td>

                        <td className="p-3">

                          {estudante.status === "PENDENTE" && (
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-semibold">
                              PENDENTE
                            </span>
                          )}

                          {estudante.status === "APROVADO" && (
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold">
                              APROVADO
                            </span>
                          )}

                          {estudante.status === "REJEITADO" && (
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold">
                              REJEITADO
                            </span>
                          )}

                        </td>

                        <td className="p-3">

                          {estudante.status === "PENDENTE" && (
                            <div className="flex gap-2">
                              <AprovarButton id={estudante.id} />
                              <RejeitarButton id={estudante.id} />
                            </div>
                          )}

                          {estudante.status === "APROVADO" &&
                            estudante.numeroCarteira && (
                              <a
                                href={`/carteira/${estudante.numeroCarteira}`}
                                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded-lg"
                              >
                                👁️ Ver Carteira
                              </a>
                            )}

                          {estudante.status === "REJEITADO" && (
                            <span className="text-red-600 font-semibold">
                              Cadastro rejeitado
                            </span>
                          )}

                        </td>

                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>
            )}

          </div>

        </div>

      </div>
    </main>
  );
}