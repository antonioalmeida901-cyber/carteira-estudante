import { SignJWT, jwtVerify } from "jose";

const secret = process.env.AUTH_SECRET;

if (!secret) {
  throw new Error("AUTH_SECRET não configurado.");
}

const secretKey = new TextEncoder().encode(secret);

export async function criarSessao(estudanteId: number) {
  return await new SignJWT({
    estudanteId,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey);
}

export async function verificarSessao(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);

    return {
      estudanteId: Number(payload.estudanteId),
    };
  } catch {
    return null;
  }
}