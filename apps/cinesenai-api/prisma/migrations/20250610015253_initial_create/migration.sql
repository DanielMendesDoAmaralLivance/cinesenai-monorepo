-- CreateEnum
CREATE TYPE "TipoIntegranteEnum" AS ENUM ('Diretor', 'Ator');

-- CreateEnum
CREATE TYPE "ClassificacaoIndicativaEnum" AS ENUM ('Livre', 'A10', 'A12', 'A14', 'A16', 'A18');

-- CreateEnum
CREATE TYPE "TipoIdiomaEnum" AS ENUM ('Dublado', 'Legendado', 'Original');

-- CreateEnum
CREATE TYPE "TipoSessaoEnum" AS ENUM ('3D', 'Normal', 'Autismo');

-- CreateEnum
CREATE TYPE "TipoSalaEnum" AS ENUM ('SalaNormal', 'SalaVip', 'Sala4D');

-- CreateEnum
CREATE TYPE "TipoAssentoEnum" AS ENUM ('Normal', 'Preferencial', 'Acompanhante', 'NamoradeiraEsquerda', 'NamoradeiraDireita');

-- CreateEnum
CREATE TYPE "SessaoAssentoStatusEnum" AS ENUM ('Reservado', 'Confirmado');

-- CreateEnum
CREATE TYPE "TipoEntradaEnum" AS ENUM ('Inteira', 'MeiaEstudante', 'MeiaBradesco');

-- CreateEnum
CREATE TYPE "FormaPagamentoEnum" AS ENUM ('CartaoCredito', 'CartaoDebito', 'Pix');

-- CreateTable
CREATE TABLE "genero" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filme_genero" (
    "id" SERIAL NOT NULL,
    "filme_id" INTEGER NOT NULL,
    "genero_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filme_genero_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filme" (
    "id" SERIAL NOT NULL,
    "classificacao_indicativa_id" INTEGER NOT NULL,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "duracao_em_minutos" INTEGER NOT NULL,
    "trailer_url" TEXT NOT NULL,
    "capa_url" TEXT NOT NULL,
    "data_lancamento" TIMESTAMP(3) NOT NULL,
    "data_inicio_cartaz" TIMESTAMP(3) NOT NULL,
    "data_fim_cartaz" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filme_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "filme_integrante" (
    "id" SERIAL NOT NULL,
    "filme_id" INTEGER NOT NULL,
    "integrante_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "filme_integrante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "integrante" (
    "id" SERIAL NOT NULL,
    "tipo_integrante_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "sobrenome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "integrante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_integrante" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_integrante_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "classificacao_indicativa" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "classificacao_indicativa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_idioma" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_idioma_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_sessao" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessao" (
    "id" SERIAL NOT NULL,
    "filme_id" INTEGER NOT NULL,
    "sala_id" INTEGER NOT NULL,
    "tipo_sessao_id" INTEGER NOT NULL,
    "tipo_idioma_id" INTEGER NOT NULL,
    "inicio" TIMESTAMP(3) NOT NULL,
    "fim" TIMESTAMP(3) NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessao_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_sala" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sala" (
    "id" SERIAL NOT NULL,
    "tipo_sala_id" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sala_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_assento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_assento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "assento" (
    "id" SERIAL NOT NULL,
    "sala_id" INTEGER NOT NULL,
    "tipo_assento_id" INTEGER NOT NULL,
    "fileira" TEXT NOT NULL,
    "coluna" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "assento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessao_assento_status" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessao_assento_status_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sessao_assento" (
    "id" SERIAL NOT NULL,
    "sessao_id" INTEGER NOT NULL,
    "assento_id" INTEGER NOT NULL,
    "ingresso_id" INTEGER NOT NULL,
    "sessao_assento_status_id" INTEGER NOT NULL,
    "tipo_entrada_id" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sessao_assento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tipo_entrada" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tipo_entrada_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ingresso" (
    "id" SERIAL NOT NULL,
    "documento_responsavel" INTEGER NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ingresso_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "forma_pagamento" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "forma_pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "pagamento" (
    "id" SERIAL NOT NULL,
    "ingresso_id" INTEGER NOT NULL,
    "forma_pagamento_id" INTEGER NOT NULL,
    "valor_total" DOUBLE PRECISION NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado_em" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "pagamento_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "genero_nome_key" ON "genero"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "filme_genero_genero_id_filme_id_key" ON "filme_genero"("genero_id", "filme_id");

-- CreateIndex
CREATE UNIQUE INDEX "filme_titulo_key" ON "filme"("titulo");

-- CreateIndex
CREATE UNIQUE INDEX "filme_integrante_integrante_id_filme_id_key" ON "filme_integrante"("integrante_id", "filme_id");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_integrante_nome_key" ON "tipo_integrante"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "classificacao_indicativa_nome_key" ON "classificacao_indicativa"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_idioma_nome_key" ON "tipo_idioma"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_sessao_nome_key" ON "tipo_sessao"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_sala_nome_key" ON "tipo_sala"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "sala_nome_key" ON "sala"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_assento_nome_key" ON "tipo_assento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "sessao_assento_status_nome_key" ON "sessao_assento_status"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "sessao_assento_sessao_id_assento_id_key" ON "sessao_assento"("sessao_id", "assento_id");

-- CreateIndex
CREATE UNIQUE INDEX "tipo_entrada_nome_key" ON "tipo_entrada"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "forma_pagamento_nome_key" ON "forma_pagamento"("nome");

-- CreateIndex
CREATE UNIQUE INDEX "pagamento_ingresso_id_key" ON "pagamento"("ingresso_id");

-- AddForeignKey
ALTER TABLE "filme_genero" ADD CONSTRAINT "filme_genero_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_genero" ADD CONSTRAINT "filme_genero_genero_id_fkey" FOREIGN KEY ("genero_id") REFERENCES "genero"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme" ADD CONSTRAINT "filme_classificacao_indicativa_id_fkey" FOREIGN KEY ("classificacao_indicativa_id") REFERENCES "classificacao_indicativa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_integrante" ADD CONSTRAINT "filme_integrante_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "filme_integrante" ADD CONSTRAINT "filme_integrante_integrante_id_fkey" FOREIGN KEY ("integrante_id") REFERENCES "integrante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "integrante" ADD CONSTRAINT "integrante_tipo_integrante_id_fkey" FOREIGN KEY ("tipo_integrante_id") REFERENCES "tipo_integrante"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_filme_id_fkey" FOREIGN KEY ("filme_id") REFERENCES "filme"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_sala_id_fkey" FOREIGN KEY ("sala_id") REFERENCES "sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_tipo_sessao_id_fkey" FOREIGN KEY ("tipo_sessao_id") REFERENCES "tipo_sessao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao" ADD CONSTRAINT "sessao_tipo_idioma_id_fkey" FOREIGN KEY ("tipo_idioma_id") REFERENCES "tipo_idioma"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sala" ADD CONSTRAINT "sala_tipo_sala_id_fkey" FOREIGN KEY ("tipo_sala_id") REFERENCES "tipo_sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assento" ADD CONSTRAINT "assento_sala_id_fkey" FOREIGN KEY ("sala_id") REFERENCES "sala"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "assento" ADD CONSTRAINT "assento_tipo_assento_id_fkey" FOREIGN KEY ("tipo_assento_id") REFERENCES "tipo_assento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assento" ADD CONSTRAINT "sessao_assento_sessao_id_fkey" FOREIGN KEY ("sessao_id") REFERENCES "sessao"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assento" ADD CONSTRAINT "sessao_assento_assento_id_fkey" FOREIGN KEY ("assento_id") REFERENCES "assento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assento" ADD CONSTRAINT "sessao_assento_ingresso_id_fkey" FOREIGN KEY ("ingresso_id") REFERENCES "ingresso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assento" ADD CONSTRAINT "sessao_assento_sessao_assento_status_id_fkey" FOREIGN KEY ("sessao_assento_status_id") REFERENCES "sessao_assento_status"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sessao_assento" ADD CONSTRAINT "sessao_assento_tipo_entrada_id_fkey" FOREIGN KEY ("tipo_entrada_id") REFERENCES "tipo_entrada"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_ingresso_id_fkey" FOREIGN KEY ("ingresso_id") REFERENCES "ingresso"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "pagamento" ADD CONSTRAINT "pagamento_forma_pagamento_id_fkey" FOREIGN KEY ("forma_pagamento_id") REFERENCES "forma_pagamento"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
