/*
  Warnings:

  - Added the required column `phase` to the `pages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "pages" ADD COLUMN     "phase" TEXT NOT NULL;
