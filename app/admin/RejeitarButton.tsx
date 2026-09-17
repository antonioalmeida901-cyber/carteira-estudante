"use client";

import { useState } from "react";

export default function RejeitarButton({ id }: { id: number }) {
  const [carregando, setCarregando] = useState(false);

  async function rejeitar() {
    const confirmar = window.confirm(
      "Tem certeza que deseja rejeitar este cadastro?"
    );

    if (!confirmar) {
      return;
    }

    setCarregando(true);

    try {
      const resposta = await fetch(
        `/api/estudantes/${id}/rejeitar`,
        {
          method: "PATCH",
        }
      );

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Não foi possível rejeitar.");
        return;
      }

      alert("Cadastro rejeitado com sucesso!");

      window.location.reload();
    } catch (error) {
      console.error(error);
      alert("Erro de conexão com o servidor.");
    } finally {
      setCarregando(false);
    }
  }

  return (
    <button
      type="button"
      onClick={rejeitar}
      disabled={carregando}
      className="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg"
    >
      {carregando ? "Rejeitando..." : "Rejeitar"}
    </button>
  );
}