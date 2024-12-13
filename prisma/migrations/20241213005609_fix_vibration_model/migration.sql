/*
  Warnings:

  - You are about to drop the `humidity` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "humidity";

-- CreateTable
CREATE TABLE "vibration" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "vibration_pkey" PRIMARY KEY ("id")
);
