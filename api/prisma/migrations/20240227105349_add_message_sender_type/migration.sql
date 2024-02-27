/*
  Warnings:

  - Changed the type of `senderType` on the `Message` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "MessageSenderType" AS ENUM ('BOT', 'CLIENT', 'MEMBER');

-- AlterTable
ALTER TABLE "Message" DROP COLUMN "senderType",
ADD COLUMN     "senderType" "MessageSenderType" NOT NULL;
