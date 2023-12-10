-- CreateTable
CREATE TABLE "Instituicao" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,

    CONSTRAINT "Instituicao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "email" TEXT NOT NULL,
    "telefone" TEXT,
    "senha" TEXT NOT NULL,
    "status" INTEGER NOT NULL,
    "instituicaoId" INTEGER NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modulo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "instituicaoId" INTEGER NOT NULL,

    CONSTRAINT "Modulo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Curso" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "instituicaoId" INTEGER NOT NULL,

    CONSTRAINT "Curso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Selecao" (
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
    "instituicaoId" INTEGER NOT NULL,

    CONSTRAINT "Selecao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Modelo" (
    "id" SERIAL NOT NULL,
    "nome" VARCHAR(150) NOT NULL,
    "replica_form" INTEGER NOT NULL,
    "ordem" INTEGER NOT NULL,
    "selecaoId" INTEGER NOT NULL,

    CONSTRAINT "Modelo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Campoatt" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "preenchimento_inicial" TEXT NOT NULL,
    "tipocampo" INTEGER NOT NULL,
    "obrigatorio" INTEGER NOT NULL,
    "modeloId" INTEGER NOT NULL,

    CONSTRAINT "Campoatt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Listselect" (
    "id" SERIAL NOT NULL,
    "texto" TEXT NOT NULL,
    "campoattId" INTEGER,

    CONSTRAINT "Listselect_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Instituicao_nome_key" ON "Instituicao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modulo" ADD CONSTRAINT "Modulo_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Curso" ADD CONSTRAINT "Curso_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Selecao" ADD CONSTRAINT "Selecao_instituicaoId_fkey" FOREIGN KEY ("instituicaoId") REFERENCES "Instituicao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Modelo" ADD CONSTRAINT "Modelo_selecaoId_fkey" FOREIGN KEY ("selecaoId") REFERENCES "Selecao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campoatt" ADD CONSTRAINT "Campoatt_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Listselect" ADD CONSTRAINT "Listselect_campoattId_fkey" FOREIGN KEY ("campoattId") REFERENCES "Campoatt"("id") ON DELETE SET NULL ON UPDATE CASCADE;
