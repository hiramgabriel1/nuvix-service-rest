/*
  Warnings:

  - You are about to drop the column `username` on the `CompanionsProject` table. All the data in the column will be lost.
  - Added the required column `idCompanion` to the `CompanionsProject` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Bookmarks" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "CompanionsProject" DROP COLUMN "username",
ADD COLUMN     "idCompanion" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
