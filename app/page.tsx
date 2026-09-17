export default function Home() {
  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-blue-700 text-white p-8 text-center">

            <div className="text-5xl mb-3">
              🎓
            </div>

            <h1 className="text-3xl font-bold">
              Carteira do Estudante
            </h1>

            <p className="mt-2 text-blue-100">
              Sua identificação estudantil digital
            </p>

          </div>

          <div className="p-8 space-y-4">

            <a
              href="/login"
              className="block w-full text-center bg-blue-700 hover:bg-blue-800 text-white font-semibold py-4 rounded-xl"
            >
              🔐 Entrar
            </a>

            <a
              href="/cadastro"
              className="block w-full text-center border-2 border-blue-700 text-blue-700 hover:bg-blue-50 font-semibold py-4 rounded-xl"
            >
              📝 Solicitar Carteira
            </a>

            <a
              href="/validar"
              className="block w-full text-center border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-semibold py-4 rounded-xl"
            >
              🔎 Validar Carteira
            </a>

          </div>

          <div className="border-t p-5 text-center text-sm text-gray-500">
            Carteira de Estudante Digital
            <br />
            © 2026
          </div>

        </div>

      </div>
    </main>
  );
}