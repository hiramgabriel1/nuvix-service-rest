/*
  Warnings:

  - Added the required column `workId` to the `CandidatesList` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CandidatesList" ADD COLUMN     "workId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "CandidatesList" ADD CONSTRAINT "CandidatesList_workId_fkey" FOREIGN KEY ("workId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
