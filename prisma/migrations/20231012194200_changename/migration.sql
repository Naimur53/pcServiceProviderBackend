/*
  Warnings:

  - You are about to drop the column `serviceId` on the `Booking` table. All the data in the column will be lost.
  - Added the required column `pcServiceId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_serviceId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "serviceId",
ADD COLUMN     "pcServiceId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_pcServiceId_fkey" FOREIGN KEY ("pcServiceId") REFERENCES "PcService"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
