-- DropIndex
DROP INDEX "Message_recieverId_key";

-- AlterTable
ALTER TABLE "Message" ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Message_pkey" PRIMARY KEY ("id");
