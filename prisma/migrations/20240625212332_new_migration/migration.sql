-- CreateTable
CREATE TABLE "Posts" (
    "id" SERIAL NOT NULL,
    "titlePost" TEXT NOT NULL,
    "descriptionPost" TEXT NOT NULL,
    "photoUrlWallpaper" TEXT NOT NULL,
    "imageUrlReference" TEXT NOT NULL,
    "categoryPost" TEXT NOT NULL,
    "creatorPostId" INTEGER NOT NULL,

    CONSTRAINT "Posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentsPost" (
    "id" SERIAL NOT NULL,
    "comment" TEXT NOT NULL,
    "userCreatorId" INTEGER NOT NULL,

    CONSTRAINT "CommentsPost_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Posts" ADD CONSTRAINT "Posts_creatorPostId_fkey" FOREIGN KEY ("creatorPostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentsPost" ADD CONSTRAINT "CommentsPost_userCreatorId_fkey" FOREIGN KEY ("userCreatorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
