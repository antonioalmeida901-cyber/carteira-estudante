import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import fs from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const nome = formData.get("nome") as string;
    const cpf = formData.get("cpf") as string;
    const nascimento = formData.get("nascimento") as string;
    const instituicao = formData.get("instituicao") as string;
    const curso = formData.get("curso") as string;
    const matricula = formData.get("matricula") as string;

    const arquivoFoto = formData.get("foto") as File | null;

    let foto: string | undefined;

    if (arquivoFoto && arquivoFoto.size > 0) {
      const extensao = arquivoFoto.name.split(".").pop() || "jpg";
      const nomeArquivo = `${Date.now()}.${extensao}`;

      const pastaFotos = path.join(
        process.cwd(),
        "public",
        "uploads"
      );

      await fs.mkdir(pastaFotos, { recursive: true });

      const bytes = await arquivoFoto.arrayBuffer();
      const buffer = Buffer.from(bytes);

      await fs.writeFile(
        path.join(pastaFotos, nomeArquivo),
        buffer
      );

      foto = `/uploads/${nomeArquivo}`;
    }

    const estudante = await prisma.estudante.create({
      data: {
        nome,
        cpf,
        dataNascimento: new Date(nascimento),
        instituicao,
        curso,
        matricula,
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