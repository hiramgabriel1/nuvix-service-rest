-- AddForeignKey
ALTER TABLE "Bookmarks" ADD CONSTRAINT "Bookmarks_idPost_fkey" FOREIGN KEY ("idPost") REFERENCES "Posts"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
