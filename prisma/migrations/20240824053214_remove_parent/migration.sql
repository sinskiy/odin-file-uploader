/*
  Warnings:

  - You are about to drop the column `parentId` on the `Folder` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Folder" DROP CONSTRAINT "Folder_parentId_fkey";

-- DropIndex
DROP INDEX "Folder_parentId_key";

-- AlterTable
ALTER TABLE "Folder" DROP COLUMN "parentId";
