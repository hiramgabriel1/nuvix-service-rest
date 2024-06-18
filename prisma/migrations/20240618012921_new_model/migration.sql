-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "modifiedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "CandidatesList" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "descriptionLong" TEXT NOT NULL,

    CONSTRAINT "CandidatesList_pkey" PRIMARY KEY ("id")
);
