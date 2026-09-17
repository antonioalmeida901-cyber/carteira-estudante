"use client";

import { useState } from "react";

export default function Cadastro() {
const [nome, setNome] = useState("");
const [cpf, setCpf] = useState("");
const [nascimento, setNascimento] = useState("");
const [instituicao, setInstituicao] = useState("");
const [curso, setCurso] = useState("");
const [matricula, setMatricula] = useState("");
const [foto, setFoto] = useState<File | null>(null);
const [enviando, setEnviando] = useState(false);

async function cadastrar(e: React.FormEvent<HTMLFormElement>) {
e.preventDefault();

setEnviando(true);

try {
  const dadosFormulario = new FormData();

  dadosFormulario.append("nome", nome);
  dadosFormulario.append("cpf", cpf);
  dadosFormulario.append("nascimento", nascimento);
  dadosFormulario.append("instituicao", instituicao);
  dadosFormulario.append("curso", curso);
  dadosFormulario.append("matricula", matricula);

  if (foto) {
    dadosFormulario.append("foto", foto);
  }

  const resposta = await fetch("/api/estudantes", {
    method: "POST",
    body: dadosFormulario,
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    alert(dados.erro || "Não foi possível realizar o cadastro.");
    return;
  }

  alert("Cadastro realizado com sucesso!");

  setNome("");
  setCpf("");
  setNascimento("");
  setInstituicao("");
  setCurso("");
  setMatricula("");
  setFoto(null);
} catch (error) {
  console.error(error);
  alert("Erro de conexão com o servidor.");
} finally {
  setEnviando(false);
}

}

return ( <main className="min-h-screen bg-gray-100 p-6"> <div className="max-w-2xl mx-auto">

    <div className="mb-6">
      <a
        href="/"
        className="text-blue-700 font-semibold hover:underline"
      >
        ← Voltar
      </a>
    </div>

    <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

      <div className="bg-blue-700 text-white p-8">
        <div className="text-5xl mb-3">
          🎓
        </div>

        <h1 className="text-3xl font-bold">
          Solicitar Carteira
        </h1>

        <p className="mt-2 text-blue-100">
          Preencha seus dados para solicitar sua carteira estudantil.
        </p>
      </div>

      <form
        onSubmit={cadastrar}
        className="p-8 space-y-5"
      >

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Nome completo
          </label>

          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Digite seu nome completo"
            required
            className="w-full border border-gray-300 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            CPF
          </label>

          <input
            type="text"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="Digite seu CPF"
            required
            className="w-full border border-gray-300 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Data de nascimento
          </label>

          <input
            type="date"
            value={nascimento}
            onChange={(e) => setNascimento(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Instituição de ensino
          </label>

          <input
            type="text"
            value={instituicao}
            onChange={(e) => setInstituicao(e.target.value)}
            placeholder="Nome da instituição"
            required
            className="w-full border border-gray-300 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Curso
          </label>

          <input
            type="text"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            placeholder="Nome do curso"
            required
            className="w-full border border-gray-300 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Matrícula
          </label>

          <input
            type="text"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            placeholder="Número da matrícula"
            required
            className="w-full border border-gray-300 rounded-xl p-4"
          />
        </div>

        <div>
          <label className="block font-semibold text-gray-700 mb-2">
            Foto do estudante
          </label>

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              const arquivo = e.target.files?.[0] || null;
              setFoto(arquivo);
            }}
            className="w-full border border-gray-300 rounded-xl p-4"
          />

          {foto && (
            <p className="text-sm text-green-600 mt-2">
              Foto selecionada: {foto.name}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={enviando}
          className="w-full bg-blue-700 hover:bg-blue-800 disabled:bg-gray-400 text-white font-bold py-4 rounded-xl"
        >
          {enviando ? "Enviando..." : "Solicitar Carteira"}
        </button>

      </form>

    </div>

  </div>
</main>

);
}
