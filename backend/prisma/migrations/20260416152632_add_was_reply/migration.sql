-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_parentId_fkey";

-- AlterTable
ALTER TABLE "posts" ADD COLUMN     "wasReply" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "posts"("id") ON DELETE SET NULL ON UPDATE CASCADE;
