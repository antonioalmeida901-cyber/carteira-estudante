import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nome = formData.get("nome") as string;
    const cpf = formData.get("cpf") as string;
    const nascimento = formData.get("nascimento") as string;
    const instituicao = formData.get("instituicao") as string;
    const curso = formData.get("curso") as string;
    const matricula = formData.get("matricula") as string;
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const senha = formData.get("senha") as string;

    if (!email || !senha) {
      return NextResponse.json(
        { erro: "E-mail e senha são obrigatórios." },
        { status: 400 }
      );
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const arquivoFoto = formData.get("foto") as File | null;

    let foto: string | undefined;

    if (arquivoFoto && arquivoFoto.size > 0) {
      const bytes = await arquivoFoto.arrayBuffer();
      const base64 = Buffer.from(bytes).toString("base64");

      const tipo = arquivoFoto.type || "image/jpeg";

      foto = `data:${tipo};base64,${base64}`;
    }

    const estudante = await prisma.estudante.create({
      data: {
        nome,
        cpf,
        dataNascimento: new Date(nascimento),
        instituicao,
        curso,
        matricula,
        email,
        senha: senhaHash,
        foto,
      },
    });

    return NextResponse.json(estudante, { status: 201 });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Não foi possível realizar o cadastro." },
      { status: 500 }
    );
  }
}
