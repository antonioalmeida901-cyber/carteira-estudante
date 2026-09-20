/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Estudante` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Estudante" ADD COLUMN "email" TEXT;
ALTER TABLE "Estudante" ADD COLUMN "senha" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Estudante_email_key" ON "Estudante"("email");
