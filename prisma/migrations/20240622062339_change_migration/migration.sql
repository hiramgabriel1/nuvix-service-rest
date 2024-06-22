/*
  Warnings:

  - You are about to drop the `PostSaves` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "PostSaves";

-- CreateTable
CREATE TABLE "Bookmarks" (
    "id" SERIAL NOT NULL,
    "idPost" INTEGER NOT NULL,

    CONSTRAINT "Bookmarks_pkey" PRIMARY KEY ("id")
);
