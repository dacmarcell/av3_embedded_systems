-- CreateTable
CREATE TABLE "temperature" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "temperature_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "humidity" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "humidity_pkey" PRIMARY KEY ("id")
);
