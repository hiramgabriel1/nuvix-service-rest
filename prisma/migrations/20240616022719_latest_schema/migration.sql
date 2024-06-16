/*
  Warnings:

  - You are about to drop the column `workExperienceId` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `example` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `workExperience` to the `User` table without a default value. This is not possible if the table is not empty.
  - Made the column `ownerProjectId` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "User_ownerProjectId_key";

-- DropIndex
DROP INDEX "User_workExperienceId_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "workExperienceId",
ADD COLUMN     "workExperience" TEXT NOT NULL,
ALTER COLUMN "ownerProjectId" SET NOT NULL,
ALTER COLUMN "ownerProjectId" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "example";

-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "projectTitle" TEXT NOT NULL,
    "projectLocation" TEXT NOT NULL,
    "isProjectRemote" BOOLEAN NOT NULL DEFAULT false,
    "salaryRange" DECIMAL(65,30) NOT NULL,
    "isPayment" BOOLEAN NOT NULL DEFAULT false,
    "skills" TEXT[],

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
