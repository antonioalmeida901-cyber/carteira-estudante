"use client";

import { useState } from "react";

export default function Login() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (usuario === "admin" && senha === "123456") {
      document.cookie = "admin_logado=true; path=/";
      window.location.href = "/admin";
      return;
    }

    alert("Usuário ou senha inválidos.");
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-blue-700 text-white p-8 text-center">

            <div className="text-5xl mb-3">
              🔐
            </div>

            <h1 className="text-3xl font-bold">
              Área Administrativa
            </h1>

            <p className="mt-2 text-blue-100">
              Acesso restrito
            </p>

          </div>

          <form
            onSubmit={entrar}
            className="p-8 space-y-5"
          >

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Usuário
              </label>

              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                placeholder="Digite o usuário"
                required
                className="w-full border border-gray-300 rounded-xl p-4"
              />
            </div>

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                Senha
              </label>

              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="Digite a senha"
                required
                className="w-full border border-gray-300 rounded-xl p-4"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-700 hover:bg-blue-800 text-white font-bold py-4 rounded-xl"
            >
              Entrar
            </button>

            <a
              href="/"
              className="block text-center text-blue-700 font-semibold hover:underline"
            >
              ← Voltar
            </a>

          </form>

        </div>

      </div>

    </main>
  );
}