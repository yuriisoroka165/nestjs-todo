/*
  Warnings:

  - You are about to drop the column `TodoStatus` on the `Todo` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Todo" DROP COLUMN "TodoStatus",
ADD COLUMN     "satus" "TodoStatus" NOT NULL DEFAULT 'PENDING';
