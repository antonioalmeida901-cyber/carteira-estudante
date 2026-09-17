import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const estudanteId = Number(id);

    if (!Number.isInteger(estudanteId)) {
      return NextResponse.json(
        { erro: "ID inválido." },
        { status: 400 }
      );
    }

    const validade = new Date();
    validade.setFullYear(validade.getFullYear() + 1);

    const numeroCarteira = `EST-${new Date().getFullYear()}-${String(estudanteId).padStart(6, "0")}`;

    const estudante = await prisma.estudante.update({
      where: {
        id: estudanteId,
      },
      data: {
        status: "APROVADO",
        numeroCarteira,
        validade,
      },
    });

    return NextResponse.json(estudante);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Não foi possível aprovar o estudante." },
      { status: 500 }
    );
  }
}