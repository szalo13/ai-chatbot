/*
  Warnings:

  - The values [pending] on the enum `ModelStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "ModelStatus_new" AS ENUM ('NOT_TRAINED', 'AWAITING_TRAINING', 'DURING_TRAINING', 'created', 'FAILED');
ALTER TABLE "Model" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Model" ALTER COLUMN "status" TYPE "ModelStatus_new" USING ("status"::text::"ModelStatus_new");
ALTER TYPE "ModelStatus" RENAME TO "ModelStatus_old";
ALTER TYPE "ModelStatus_new" RENAME TO "ModelStatus";
DROP TYPE "ModelStatus_old";
ALTER TABLE "Model" ALTER COLUMN "status" SET DEFAULT 'NOT_TRAINED';
COMMIT;
