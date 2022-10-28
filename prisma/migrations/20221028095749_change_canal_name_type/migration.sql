/*
  Warnings:

  - You are about to alter the column `name` on the `Canal_Size` table. The data in that column could be lost. The data in that column will be cast from `Enum("Canal_Size_name")` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `Canal_Size` MODIFY `name` VARCHAR(191) NOT NULL;
