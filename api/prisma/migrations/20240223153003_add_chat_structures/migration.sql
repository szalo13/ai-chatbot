/*
  Warnings:

  - The values [text,pdf] on the enum `DataSourceType` will be removed. If these variants are still used in the database, this will fail.
  - The values [created] on the enum `ModelStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- CreateEnum
CREATE TYPE "ChatStatus" AS ENUM ('BOT', 'ESCALATED');

-- AlterEnum
BEGIN;
CREATE TYPE "DataSourceType_new" AS ENUM ('TEXT', 'PDF');
ALTER TABLE "DataSource" ALTER COLUMN "type" TYPE "DataSourceType_new" USING ("type"::text::"DataSourceType_new");
ALTER TYPE "DataSourceType" RENAME TO "DataSourceType_old";
ALTER TYPE "DataSourceType_new" RENAME TO "DataSourceType";
DROP TYPE "DataSourceType_old";
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "ModelStatus_new" AS ENUM ('NOT_TRAINED', 'AWAITING_TRAINING', 'DURING_TRAINING', 'CREATED', 'FAILED');
ALTER TABLE "Model" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Model" ALTER COLUMN "status" TYPE "ModelStatus_new" USING ("status"::text::"ModelStatus_new");
ALTER TYPE "ModelStatus" RENAME TO "ModelStatus_old";
ALTER TYPE "ModelStatus_new" RENAME TO "ModelStatus";
DROP TYPE "ModelStatus_old";
ALTER TABLE "Model" ALTER COLUMN "status" SET DEFAULT 'NOT_TRAINED';
COMMIT;

-- CreateTable
CREATE TABLE "Chat" (
    "id" SERIAL NOT NULL,
    "clientId" TEXT NOT NULL,
    "chatbotId" INTEGER NOT NULL,
    "status" "ChatStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Chat_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Message" (
    "id" SERIAL NOT NULL,
    "chatId" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "senderType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Chat_clientId_key" ON "Chat"("clientId");

-- AddForeignKey
ALTER TABLE "Chat" ADD CONSTRAINT "Chat_chatbotId_fkey" FOREIGN KEY ("chatbotId") REFERENCES "Chatbot"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_chatId_fkey" FOREIGN KEY ("chatId") REFERENCES "Chat"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
