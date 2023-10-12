-- CreateTable
CREATE TABLE "Feeback" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "comment" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Feeback_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Feeback" ADD CONSTRAINT "Feeback_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
