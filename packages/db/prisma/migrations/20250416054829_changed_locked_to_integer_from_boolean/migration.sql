/*
  Warnings:

  - Changed the type of `locked` on the `Balance` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Balance" DROP COLUMN "locked",
ADD COLUMN     "locked" INTEGER NOT NULL;
