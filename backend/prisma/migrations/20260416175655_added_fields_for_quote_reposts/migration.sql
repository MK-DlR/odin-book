-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "quotedId" INTEGER;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_quotedId_fkey" FOREIGN KEY ("quotedId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
