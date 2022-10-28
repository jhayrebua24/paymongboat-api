/*
  Warnings:

  - You are about to alter the column `name` on the `Canal_Size` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum("Canal_Size_name")`.

*/
-- AlterTable
ALTER TABLE `Canal_Size` MODIFY `name` ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'small';
