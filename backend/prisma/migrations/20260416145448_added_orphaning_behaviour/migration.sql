-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_parentId_fkey";

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE CASCADE;
