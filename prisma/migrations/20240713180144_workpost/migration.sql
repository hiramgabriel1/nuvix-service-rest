/*
  Warnings:

  - Added the required column `projectDescription` to the `WorkPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "WorkPost" ADD COLUMN     "projectDescription" TEXT NOT NULL;
