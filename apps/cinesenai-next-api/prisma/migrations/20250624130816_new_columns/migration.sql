/*
  Warnings:

  - You are about to drop the column `nome` on the `sala` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[numero]` on the table `sala` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "sala_nome_key";

-- AlterTable
ALTER TABLE "filme" ADD COLUMN     "banner_url" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "sala" DROP COLUMN "nome",
ADD COLUMN     "numero" TEXT NOT NULL DEFAULT '1',
ADD COLUMN     "quantidade_assentos_por_fileira" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "quantidade_fileiras" INTEGER NOT NULL DEFAULT 0;

-- CreateIndex
CREATE UNIQUE INDEX "sala_numero_key" ON "sala"("numero");
