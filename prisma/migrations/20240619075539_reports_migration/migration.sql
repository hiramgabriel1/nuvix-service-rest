-- AlterTable
ALTER TABLE "CandidatesList" ALTER COLUMN "isWaitingResponse" SET DEFAULT true;

-- CreateTable
CREATE TABLE "Reports" (
    "id" SERIAL NOT NULL,
    "titleReport" TEXT NOT NULL,
    "typeReport" TEXT NOT NULL,
    "descriptionReport" TEXT NOT NULL,
    "isPending" BOOLEAN NOT NULL DEFAULT true,
    "isResolved" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Reports_pkey" PRIMARY KEY ("id")
);
