/*
  Warnings:

  - You are about to drop the column `storyUuid` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the column `storyUuid` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `createdByEmail` on the `files` table. All the data in the column will be lost.
  - The primary key for the `stories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `createdByEmail` on the `stories` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[uuid]` on the table `stories` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `storyId` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyId` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdById` to the `files` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_storyUuid_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_storyUuid_fkey";

-- DropForeignKey
ALTER TABLE "files" DROP CONSTRAINT "files_createdByEmail_fkey";

-- DropForeignKey
ALTER TABLE "stories" DROP CONSTRAINT "stories_createdByEmail_fkey";

-- AlterTable
ALTER TABLE "chapters" DROP COLUMN "storyUuid",
ADD COLUMN     "storyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "storyUuid",
ADD COLUMN     "storyId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "files" DROP COLUMN "createdByEmail",
ADD COLUMN     "createdById" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "stories" DROP CONSTRAINT "stories_pkey",
DROP COLUMN "createdByEmail",
ADD COLUMN     "createdById" INTEGER,
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "stories_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "users_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "stories_uuid_key" ON "stories"("uuid");

-- AddForeignKey
ALTER TABLE "files" ADD CONSTRAINT "files_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "stories" ADD CONSTRAINT "stories_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "stories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
