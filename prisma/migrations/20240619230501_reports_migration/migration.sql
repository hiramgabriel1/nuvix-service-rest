/*
  Warnings:

  - Added the required column `userReporteredId` to the `Reports` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Reports" ADD COLUMN     "userReporteredId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Reports" ADD CONSTRAINT "Reports_userReporteredId_fkey" FOREIGN KEY ("userReporteredId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
