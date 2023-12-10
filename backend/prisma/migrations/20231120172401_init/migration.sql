/*
  Warnings:

  - You are about to drop the column `selecaoId` on the `Modelo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Modelo" DROP COLUMN "selecaoId",
ADD COLUMN     "selecaomodeloId" INTEGER;

-- AddForeignKey
ALTER TABLE "Modelo" ADD CONSTRAINT "Modelo_selecaomodeloId_fkey" FOREIGN KEY ("selecaomodeloId") REFERENCES "Selecaomodelo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
