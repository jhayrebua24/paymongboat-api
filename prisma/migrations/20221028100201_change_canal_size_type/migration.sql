/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `Canal_Size` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Canal_Size_name_key` ON `Canal_Size`(`name`);
