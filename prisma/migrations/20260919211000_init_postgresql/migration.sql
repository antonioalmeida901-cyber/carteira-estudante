-- CreateTable
CREATE TABLE "Estudante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" TIMESTAMP(3) NOT NULL,
    "instituicao" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "foto" TEXT,
    "numeroCarteira" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "validade" TIMESTAMP(3),
    "criadoEm" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" TIMESTAMP(3) NOT NULL,
    "email" TEXT,
    "senha" TEXT,

    CONSTRAINT "Estudante_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_cpf_key" ON "Estudante"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_numeroCarteira_key" ON "Estudante"("numeroCarteira");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_email_key" ON "Estudante"("email");

