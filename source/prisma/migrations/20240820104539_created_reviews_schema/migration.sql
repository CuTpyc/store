-- CreateTable
CREATE TABLE "ProductReview" (
    "id" SERIAL NOT NULL,
    "rate" INTEGER NOT NULL,
    "review" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "productId" INTEGER NOT NULL,
    "customerId" INTEGER NOT NULL,

    CONSTRAINT "ProductReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ReviewProductIdIndex" ON "ProductReview"("productId");

-- CreateIndex
CREATE INDEX "ReviewCustomerIdIndex" ON "ProductReview"("customerId");

-- CreateIndex
CREATE INDEX "ReviewRateIndex" ON "ProductReview"("rate");

-- CreateIndex
CREATE INDEX "ReviewCreatedAtIndex" ON "ProductReview"("createdAt");

-- CreateIndex
CREATE INDEX "ReviewUpdatedAtIndex" ON "ProductReview"("updatedAt");

-- CreateIndex
CREATE INDEX "ReviewDeletedAtIndex" ON "ProductReview"("deletedAt");

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductReview" ADD CONSTRAINT "ProductReview_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
