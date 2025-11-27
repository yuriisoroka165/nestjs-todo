/*
  Warnings:

  - You are about to drop the column `satus` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "satus",
ADD COLUMN     "status" "TodoStatus" NOT NULL DEFAULT 'PENDING';
