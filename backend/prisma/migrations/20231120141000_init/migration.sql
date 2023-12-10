-- DropForeignKey
ALTER TABLE "Campoatt" DROP CONSTRAINT "Campoatt_modeloId_fkey";

-- DropForeignKey
ALTER TABLE "Modelo" DROP CONSTRAINT "Modelo_selecaoId_fkey";

-- AlterTable
ALTER TABLE "Campoatt" ALTER COLUMN "modeloId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Modelo" ALTER COLUMN "selecaoId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Campoatt" ADD CONSTRAINT "Campoatt_modeloId_fkey" FOREIGN KEY ("modeloId") REFERENCES "Modelo"("id") ON DELETE SET NULL ON UPDATE CASCADE;
