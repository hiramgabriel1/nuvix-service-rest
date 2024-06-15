/*
  Warnings:

  - You are about to drop the column `name` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `Posts` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[workExperienceId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[ownerProjectId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `about` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `avatar_url` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `descriptionLong` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `profesion` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Posts" DROP CONSTRAINT "Posts_userId_fkey";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "name",
ADD COLUMN     "about" VARCHAR(300) NOT NULL,
ADD COLUMN     "avatar_url" TEXT NOT NULL,
ADD COLUMN     "descriptionLong" VARCHAR(80) NOT NULL,
ADD COLUMN     "ownerProjectId" INTEGER,
ADD COLUMN     "profesion" TEXT NOT NULL,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "social" TEXT[],
ADD COLUMN     "username" VARCHAR(10),
ADD COLUMN     "workExperienceId" INTEGER;

-- DropTable
DROP TABLE "Posts";

-- CreateTable
CREATE TABLE "WorkExperience" (
    "id" SERIAL NOT NULL,
    "companyName" TEXT NOT NULL,
    "employmentType" TEXT NOT NULL,
    "titleWork" VARCHAR(50) NOT NULL,
    "isCurrent" BOOLEAN NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "description" VARCHAR(230) NOT NULL,

    CONSTRAINT "WorkExperience_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OwnerProject" (
    "id" SERIAL NOT NULL,
    "titleProject" VARCHAR(50) NOT NULL,
    "descriptionProject" VARCHAR(230) NOT NULL,
    "skills" TEXT[],
    "role" TEXT NOT NULL,

    CONSTRAINT "OwnerProject_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_workExperienceId_key" ON "User"("workExperienceId");

-- CreateIndex
CREATE UNIQUE INDEX "User_ownerProjectId_key" ON "User"("ownerProjectId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_workExperienceId_fkey" FOREIGN KEY ("workExperienceId") REFERENCES "WorkExperience"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_ownerProjectId_fkey" FOREIGN KEY ("ownerProjectId") REFERENCES "OwnerProject"("id") ON DELETE SET NULL ON UPDATE CASCADE;
