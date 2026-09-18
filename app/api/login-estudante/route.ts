import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { criarSessao } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const email = body.email?.trim().toLowerCase();
    const senha = body.senha;

    if (!email || !senha) {
      return NextResponse.json(
        { erro: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const estudante = await prisma.estudante.findUnique({
      where: {
        email,
      },
    });

    if (!estudante || !estudante.senha) {
      return NextResponse.json(
        { erro: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    const senhaCorreta = await bcrypt.compare(
      senha,
      estudante.senha
    );

    if (!senhaCorreta) {
      return NextResponse.json(
        { erro: "E-mail ou senha inválidos." },
        { status: 401 }
      );
    }

    if (estudante.status !== "APROVADO") {
      return NextResponse.json(
        {
          erro: `Seu cadastro está com status: ${estudante.status}. Aguarde a aprovação.`,
        },
        { status: 403 }
      );
    }

    const token = await criarSessao(estudante.id);

    const resposta = NextResponse.json({
      sucesso: true,
      estudante: {
        id: estudante.id,
        nome: estudante.nome,
        email: estudante.email,
        numeroCarteira: estudante.numeroCarteira,
      },
    });

    resposta.cookies.set("estudante_sessao", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return resposta;
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Erro ao realizar login." },
      { status: 500 }
    );
  }
}