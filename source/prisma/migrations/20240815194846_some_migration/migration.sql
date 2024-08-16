-- CreateEnum
CREATE TYPE "AdminRole" AS ENUM ('STUFF', 'ADMIN');

-- CreateEnum
CREATE TYPE "ProductStatus" AS ENUM ('ACTIVE', 'DRAFT', 'ARCHIVED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "fullName" TEXT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "AdminRole" NOT NULL DEFAULT 'STUFF',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Customer" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT,
    "note" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CustomerAddress" (
    "id" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "country" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "company" TEXT,
    "address" TEXT NOT NULL,
    "apartment" TEXT,
    "city" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CustomerAddress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "costPerItem" INTEGER NOT NULL,
    "compareAtPrice" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "sku" TEXT,
    "barcode" TEXT,
    "status" "ProductStatus" NOT NULL DEFAULT 'DRAFT',
    "avgRate" INTEGER NOT NULL DEFAULT 0,
    "totalReviews" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "categoryId" INTEGER,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "UserCreatedAtIndex" ON "User"("createdAt");

-- CreateIndex
CREATE INDEX "UserUpdatedAtIndex" ON "User"("updatedAt");

-- CreateIndex
CREATE INDEX "UserDeletedAtIndex" ON "User"("deletedAt");

-- CreateIndex
CREATE INDEX "UserRoleIndex" ON "User"("role");

-- CreateIndex
CREATE INDEX "UserFullNameIndex" ON "User"("fullName");

-- CreateIndex
CREATE UNIQUE INDEX "Customer_email_key" ON "Customer"("email");

-- CreateIndex
CREATE INDEX "CustomerCreatedAtIndex" ON "Customer"("createdAt");

-- CreateIndex
CREATE INDEX "CustomerUpdatedAtIndex" ON "Customer"("updatedAt");

-- CreateIndex
CREATE INDEX "CustomerDeletedAtIndex" ON "Customer"("deletedAt");

-- CreateIndex
CREATE INDEX "CustomerSearchIndex" ON "Customer"("firstName", "lastName", "email", "phone");

-- CreateIndex
CREATE INDEX "CustomerAddressCustomerIdIndex" ON "CustomerAddress"("customerId");

-- CreateIndex
CREATE INDEX "CustomerAddressSearchIndex" ON "CustomerAddress"("firstName", "lastName", "company", "address", "phone");

-- CreateIndex
CREATE UNIQUE INDEX "Category_slug_key" ON "Category"("slug");

-- CreateIndex
CREATE INDEX "CategoryCreatedAtIndex" ON "Category"("createdAt");

-- CreateIndex
CREATE INDEX "CategoryUpdatedAtIndex" ON "Category"("updatedAt");

-- CreateIndex
CREATE INDEX "CategoryDeletedAtIndex" ON "Category"("deletedAt");

-- CreateIndex
CREATE INDEX "CategorySearchIndex" ON "Category"("title", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "Product_slug_key" ON "Product"("slug");

-- CreateIndex
CREATE INDEX "ProductStatusIndex" ON "Product"("status");

-- CreateIndex
CREATE INDEX "ProductCategoryIdIndex" ON "Product"("categoryId");

-- CreateIndex
CREATE INDEX "ProductCreatedAtIndex" ON "Product"("createdAt");

-- CreateIndex
CREATE INDEX "ProductUpdatedAtIndex" ON "Product"("updatedAt");

-- CreateIndex
CREATE INDEX "ProductDeletedAtIndex" ON "Product"("deletedAt");

-- CreateIndex
CREATE INDEX "ProductSearchIndex" ON "Product"("title", "slug", "sku", "barcode");

-- CreateIndex
CREATE INDEX "ProductPriceIndex" ON "Product"("price");

-- CreateIndex
CREATE INDEX "ProductCompareAtPriceIndex" ON "Product"("compareAtPrice");

-- CreateIndex
CREATE INDEX "ProductAvgRateIndex" ON "Product"("avgRate");

-- CreateIndex
CREATE INDEX "ProductTotalReviewsIndex" ON "Product"("totalReviews");

-- AddForeignKey
ALTER TABLE "CustomerAddress" ADD CONSTRAINT "CustomerAddress_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE SET NULL ON UPDATE CASCADE;
