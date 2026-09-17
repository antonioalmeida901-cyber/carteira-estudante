"use client";

import { useState } from "react";

export default function AprovarButton({ id }: { id: number }) {
  const [carregando, setCarregando] = useState(false);

  async function aprovar() {
    setCarregando(true);

    try {
      const resposta = await fetch(`/api/estudantes/${id}/aprovar`, {
        method: "PATCH",
      });

      const dados = await resposta.json();

      if (!resposta.ok) {
        alert(dados.erro || "Não foi possível aprovar.");
        return;
      }

      alert(
        `Carteira aprovada com sucesso!\n\nNúmero da carteira: ${dados.numeroCarteira}`
      );

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
      onClick={aprovar}
      disabled={carregando}
      className="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold px-4 py-2 rounded-lg"
    >
      {carregando ? "Aprovando..." : "Aprovar"}
    </button>
  );
}