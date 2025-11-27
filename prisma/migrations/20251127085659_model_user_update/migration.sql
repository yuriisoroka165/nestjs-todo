-- CreateEnum
CREATE TYPE "UserPermission" AS ENUM ('USER', 'ADMIN');

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "isArchived" BOOLEAN DEFAULT false,
ADD COLUMN     "permissions" "UserPermission" NOT NULL DEFAULT 'USER';
