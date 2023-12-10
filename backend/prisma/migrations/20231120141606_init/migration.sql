/*
  Warnings:

  - You are about to drop the `Selecao` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Selecao" DROP CONSTRAINT "Selecao_instituicaoId_fkey";

-- DropTable
DROP TABLE "Selecao";

-- CreateTable
CREATE TABLE "Selecaomodelo" (
    "id" SERIAL NOT NULL,
    "descricao" VARCHAR(150) NOT NULL,
    "inicio_inscricao" TIMESTAMP(3) NOT NULL,
    "fim_inscricao" TIMESTAMP(3) NOT NULL,
    "inicio_resultado" TIMESTAMP(3) NOT NULL,
    "fim_resultado" TIMESTAMP(3) NOT NULL,
    "inicio_recurso" TIMESTAMP(3) NOT NULL,
    "fim_recurso" TIMESTAMP(3) NOT NULL,
    "resultado_final" TIMESTAMP(3) NOT NULL,
    "texto_documentacao" TEXT NOT NULL,
    "texto_final_pagina" TEXT NOT NULL,
    "instituicaoId" INTEGER,

    CONSTRAINT "Selecaomodelo_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Selecaomodelo" ADD CONSTRAINT "Selecaomodelo_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE SET NULL ON UPDATE CASCADE;
