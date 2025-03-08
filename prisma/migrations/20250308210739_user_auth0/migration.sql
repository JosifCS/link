/*
  Warnings:

  - You are about to drop the column `userId` on the `files` table. All the data in the column will be lost.
  - You are about to drop the column `createdById` on the `stories` table. All the data in the column will be lost.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `hash` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `id` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.
  - You are about to drop the `tokens` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `createdByEmail` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_userId_fkey";

-- DropForeignKey
ALTER TABLE "stories" DROP CONSTRAINT "stories_createdById_fkey";

-- DropForeignKey
ALTER TABLE "tokens" DROP CONSTRAINT "tokens_userId_fkey";

-- AlterTable
ALTER TABLE "files" DROP COLUMN "userId",
ADD COLUMN     "createdByEmail" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stories" DROP COLUMN "createdById",
ADD COLUMN     "createdByEmail" TEXT;

-- AlterTable
ALTER TABLE "users" DROP CONSTRAINT "users_pkey",
DROP COLUMN "hash",
DROP COLUMN "id",
DROP COLUMN "name";

-- DropTable
DROP TABLE "tokens";

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "users"("email") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_createdByEmail_fkey" FOREIGN KEY ("createdByEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;
