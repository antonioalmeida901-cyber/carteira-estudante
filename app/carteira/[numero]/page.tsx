import { prisma } from "@/lib/prisma";
import QRCode from "../QRCode";

export default async function CarteiraIndividual({
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

if (!estudante || estudante.status !== "APROVADO") {
return ( <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6"> <div className="bg-white rounded-3xl shadow-xl p-8 text-center max-w-md w-full"> <div className="text-5xl mb-4">❌</div>

      <h1 className="text-2xl font-bold text-gray-800">
        Carteira não encontrada
      </h1>

      <p className="text-gray-500 mt-3">
        A carteira informada não existe ou não está aprovada.
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

const urlValidacao =
"http://localhost:3000/validar?numero=" + estudante.numeroCarteira;

return ( <main className="min-h-screen bg-slate-100 flex items-center justify-center p-4"> <div className="w-full max-w-lg">

    <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-slate-200">

      <div className="bg-gradient-to-br from-blue-800 to-blue-600 text-white p-7">

        <div className="flex items-center justify-between">

          <div>
            <p className="text-blue-200 text-xs font-semibold uppercase tracking-widest">
              Identificação
            </p>

            <h1 className="text-2xl font-extrabold mt-1">
              CARTEIRA DO ESTUDANTE
            </h1>

            <p className="text-blue-100 text-sm mt-1">
              Documento Estudantil Digital
            </p>
          </div>

          <div className="text-5xl">
            🎓
          </div>

        </div>

      </div>

      <div className="p-7">

        <div className="flex flex-col items-center">

          <div className="relative">

            {estudante.foto ? (
              <img
                src={estudante.foto}
                alt={"Foto de " + estudante.nome}
                className="w-36 h-36 object-cover rounded-2xl border-4 border-white shadow-lg"
              />
            ) : (
              <div className="w-36 h-36 bg-slate-200 rounded-2xl flex items-center justify-center text-6xl shadow-lg">
                👤
              </div>
            )}

          </div>

          <h2 className="text-2xl font-extrabold text-slate-800 text-center mt-5">
            {estudante.nome}
          </h2>

          <div className="mt-3 flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-bold">
            <span>✓</span>
            <span>CARTEIRA APROVADA</span>
          </div>

        </div>

        <div className="mt-7 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-center">

          <p className="text-xs text-blue-600 font-semibold uppercase tracking-wider">
            Número da carteira
          </p>

          <p className="text-2xl font-extrabold text-blue-800 mt-1">
            {estudante.numeroCarteira}
          </p>

        </div>

        <div className="mt-6 grid gap-3">

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-semibold uppercase">
              CPF
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              {estudante.cpf}
            </p>
          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Instituição de ensino
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              {estudante.instituicao}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-semibold uppercase">
                Curso
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {estudante.curso}
              </p>
            </div>

            <div className="bg-slate-50 rounded-xl p-4">
              <p className="text-xs text-slate-500 font-semibold uppercase">
                Matrícula
              </p>

              <p className="font-semibold text-slate-800 mt-1">
                {estudante.matricula}
              </p>
            </div>

          </div>

          <div className="bg-slate-50 rounded-xl p-4">
            <p className="text-xs text-slate-500 font-semibold uppercase">
              Validade
            </p>

            <p className="font-semibold text-slate-800 mt-1">
              {validade}
            </p>
          </div>

        </div>

        <div className="mt-7 border-t pt-7">

          <div className="text-center mb-3">

            <p className="font-bold text-slate-800">
              Validação da carteira
            </p>

            <p className="text-sm text-slate-500 mt-1">
              Escaneie o QR Code para verificar a autenticidade.
            </p>

          </div>

          <QRCode valor={urlValidacao} />

        </div>

      </div>

      <div className="bg-slate-50 border-t p-5 text-center">

        <p className="text-sm font-semibold text-slate-600">
          Carteira de Estudante Digital
        </p>

        <p className="text-xs text-slate-400 mt-1">
          Documento de identificação estudantil
        </p>

      </div>

    </div>

    <p className="text-center text-xs text-slate-400 mt-5">
      Documento digital para identificação estudantil
    </p>

  </div>
</main>

);
}
