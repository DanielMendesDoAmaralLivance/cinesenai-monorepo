/*
  Warnings:

  - You are about to drop the `filme_integrante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `integrante` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_integrante` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `direcao` to the `filme` table without a default value. This is not possible if the table is not empty.
  - Added the required column `elenco` to the `filme` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "filme_integrante" DROP CONSTRAINT "filme_integrante_filme_id_fkey";

-- DropForeignKey
ALTER TABLE "filme_integrante" DROP CONSTRAINT "filme_integrante_integrante_id_fkey";

-- DropForeignKey
ALTER TABLE "integrante" DROP CONSTRAINT "integrante_tipo_integrante_id_fkey";

-- AlterTable
ALTER TABLE "filme" ADD COLUMN     "direcao" TEXT NOT NULL,
ADD COLUMN     "elenco" TEXT NOT NULL;

-- DropTable
DROP TABLE "filme_integrante";

-- DropTable
DROP TABLE "integrante";

-- DropTable
DROP TABLE "tipo_integrante";

-- DropEnum
DROP TYPE "TipoIntegranteEnum";
