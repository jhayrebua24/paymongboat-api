/*
  Warnings:

  - Added the required column `time_out` to the `Ships` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Ships` ADD COLUMN `excess_fee` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `time_in` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `time_out` DATETIME(3) NOT NULL,
    ADD COLUMN `total_amount` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `total_fee` DOUBLE NOT NULL DEFAULT 0,
    ADD COLUMN `total_hrs` DOUBLE NOT NULL DEFAULT 0;
