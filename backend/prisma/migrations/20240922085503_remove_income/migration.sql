/*
  Warnings:

  - You are about to drop the `Income` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Income" DROP CONSTRAINT "Income_user_id_fkey";

-- DropTable
DROP TABLE "Income";
