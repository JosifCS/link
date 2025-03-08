/*
  Warnings:

  - You are about to drop the column `storyId` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `chapters` table. All the data in the column will be lost.
  - You are about to drop the column `storyId` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `characters` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `dialogs` table. All the data in the column will be lost.
  - The primary key for the `stories` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `stories` table. All the data in the column will be lost.
  - Added the required column `name` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyUuid` to the `chapters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `storyUuid` to the `characters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `dialogs` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "chapters" DROP CONSTRAINT "chapters_storyId_fkey";

-- DropForeignKey
ALTER TABLE "characters" DROP CONSTRAINT "characters_storyId_fkey";

-- AlterTable
ALTER TABLE "chapters" DROP COLUMN "storyId",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "storyUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "characters" DROP COLUMN "storyId",
DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "storyUuid" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "dialogs" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "stories" DROP CONSTRAINT "stories_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "stories_pkey" PRIMARY KEY ("uuid");

-- AddForeignKey
ALTER TABLE "chapters" ADD CONSTRAINT "chapters_storyUuid_fkey" FOREIGN KEY ("storyUuid") REFERENCES "stories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "characters" ADD CONSTRAINT "characters_storyUuid_fkey" FOREIGN KEY ("storyUuid") REFERENCES "stories"("uuid") ON DELETE CASCADE ON UPDATE CASCADE;
