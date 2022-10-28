/*
  Warnings:

  - You are about to alter the column `direction` on the `Canals` table. The data in that column could be lost. The data in that column will be cast from `Enum("Canals_direction")` to `Enum("Canals_direction")`.

*/
-- AlterTable
ALTER TABLE `Canals` MODIFY `direction` ENUM('northbound', 'southbound', 'northbound_southbound') NOT NULL DEFAULT 'northbound_southbound';
