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

    const estudante = await prisma.estudante.update({
      where: {
        id: estudanteId,
      },
      data: {
        status: "REJEITADO",
        numeroCarteira: null,
        validade: null,
      },
    });

    return NextResponse.json(estudante);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { erro: "Não foi possível rejeitar o estudante." },
      { status: 500 }
    );
  }
}