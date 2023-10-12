/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Review` table. All the data in the column will be lost.
  - Added the required column `pcServiceId` to the `Review` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Review" DROP CONSTRAINT "Review_serviceId_fkey";

-- AlterTable
ALTER TABLE "Review" DROP COLUMN "serviceId",
ADD COLUMN     "pcServiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Review" ADD CONSTRAINT "Review_pcServiceId_fkey" FOREIGN KEY ("pcServiceId") REFERENCES "PcService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
