import { NextResponse } from "next/server";

export async function GET() {
  const resposta = NextResponse.redirect(
    new URL("/login", "http://localhost:3000")
  );

  resposta.cookies.delete("admin_logado");

  return resposta;
}