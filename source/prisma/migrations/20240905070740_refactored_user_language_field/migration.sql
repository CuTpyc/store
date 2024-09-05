/*
  Warnings:

  - You are about to drop the column `setedLanguage` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "setedLanguage",
ADD COLUMN     "language" "Language" NOT NULL DEFAULT 'EN';
