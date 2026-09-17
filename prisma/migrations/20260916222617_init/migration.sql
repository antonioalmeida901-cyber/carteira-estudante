-- CreateTable
CREATE TABLE "Estudante" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "dataNascimento" DATETIME NOT NULL,
    "instituicao" TEXT NOT NULL,
    "curso" TEXT NOT NULL,
    "matricula" TEXT NOT NULL,
    "foto" TEXT,
    "numeroCarteira" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "validade" DATETIME,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_cpf_key" ON "Estudante"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_numeroCarteira_key" ON "Estudante"("numeroCarteira");
