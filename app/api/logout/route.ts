import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const tipo = url.searchParams.get("tipo");

  const destino =
    tipo === "estudante" ? "/login-estudante" : "/login";

  const resposta = NextResponse.redirect(
    new URL(destino, request.url)
  );

  resposta.cookies.delete("admin_logado");
  resposta.cookies.delete("estudante_sessao");

  return resposta;
}