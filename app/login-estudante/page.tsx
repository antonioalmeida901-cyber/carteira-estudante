"use client";

import { useState } from "react";

export default function LoginEstudante() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [entrando, setEntrando] = useState(false);

  async function entrar(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    setEntrando(true);

    try {
      const resposta = await fetch("/api/login-estudante", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          senha,
        }),
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Não foi possível realizar o login.");
        return;
      }

      alert(`Bem-vindo, ${dados.estudante.nome}!`);

      if (dados.estudante.numeroCarteira) {
        window.location.href = `/carteira/${dados.estudante.numeroCarteira}`;
      } else {
        alert(
          "Seu cadastro foi aprovado, mas sua carteira ainda não possui número."
        );
      }
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setEntrando(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md">

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

          <div className="bg-blue-700 text-white p-8 text-center">

            <div className="text-5xl mb-3">
              🎓
            </div>

            <h1 className="text-3xl font-bold">
              Área do Estudante
            </h1>

            <p className="mt-2 text-blue-100">
              Acesse sua carteira estudantil
            </p>

          </div>

          <form
            onSubmit={entrar}
            className="p-8 space-y-5"
          >

            <div>
              <label className="block font-semibold text-gray-700 mb-2">
                E-mail
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Digite seu e-mail"
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
                placeholder="Digite sua senha"
                required
                className="w-full border border-gray-300 rounded-xl p-4"
              />
            </div>

            <button
              type="submit"
              disabled={entrando}
              className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl"
            >
              {entrando ? "Entrando..." : "Entrar"}
            </button>

            <div className="text-center space-y-3">

              <a
                href="/cadastro"
                className="block text-blue-700 font-semibold hover:underline"
              >
                Ainda não tenho cadastro
              </a>

              <a
                href="/"
                className="block text-gray-600 font-semibold hover:underline"
              >
                ← Voltar
              </a>

            </div>

          </form>

        </div>

      </div>
    </main>
  );
}
