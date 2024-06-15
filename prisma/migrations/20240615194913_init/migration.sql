/*
  Warnings:

  - You are about to drop the `OwnerProject` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `WorkExperience` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `companyName` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionProject` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employmentType` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isCurrent` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `role` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleProject` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleWork` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_ownerProjectId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_workExperienceId_fkey";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "companyName" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" VARCHAR(230) NOT NULL,
ADD COLUMN     "descriptionProject" VARCHAR(230) NOT NULL,
ADD COLUMN     "employmentType" TEXT NOT NULL,
ADD COLUMN     "isCurrent" BOOLEAN NOT NULL,
ADD COLUMN     "role" TEXT NOT NULL,
ADD COLUMN     "titleProject" VARCHAR(50) NOT NULL,
ADD COLUMN     "titleWork" VARCHAR(50) NOT NULL,
ADD COLUMN     "workSkills" TEXT[];

-- DropTable
DROP TABLE "OwnerProject";

-- DropTable
DROP TABLE "WorkExperience";
