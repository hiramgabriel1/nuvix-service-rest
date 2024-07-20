-- CreateTable
CREATE TABLE "UserBeta" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "lastname" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "reasons" TEXT NOT NULL,

    CONSTRAINT "UserBeta_pkey" PRIMARY KEY ("id")
);
