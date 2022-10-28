/*
  Warnings:

  - You are about to drop the column `size` on the `Canals` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `Canals` DROP COLUMN `size`,
    ADD COLUMN `size_id` INTEGER NULL;

-- CreateTable
CREATE TABLE `Canal_Size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'small',

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Canals` ADD CONSTRAINT `Canals_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `Canal_Size`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
