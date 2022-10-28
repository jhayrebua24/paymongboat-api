/*
  Warnings:

  - You are about to drop the `Canal_Size` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Canals` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Ships` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Canals` DROP FOREIGN KEY `Canals_size_id_fkey`;

-- DropForeignKey
ALTER TABLE `Ships` DROP FOREIGN KEY `Ships_canal_id_fkey`;

-- DropTable
DROP TABLE `Canal_Size`;

-- DropTable
DROP TABLE `Canals`;

-- DropTable
DROP TABLE `Ships`;

-- CreateTable
CREATE TABLE `canals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `length` DOUBLE NOT NULL DEFAULT 0,
    `ways` ENUM('one_way', 'two_way') NOT NULL DEFAULT 'one_way',
    `size_id` INTEGER NULL,

    UNIQUE INDEX `canals_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canal_routes` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `is_close` BOOLEAN NOT NULL DEFAULT false,
    `direction` ENUM('northbound', 'southbound', 'northbound_southbound') NOT NULL DEFAULT 'southbound',
    `canals_id` INTEGER NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `canal_size` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'small',

    UNIQUE INDEX `canal_size_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `ships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `canal_route_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('off_shore', 'container', 'bulk_carriers') NOT NULL DEFAULT 'off_shore',
    `time_in` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `time_out` DATETIME(3) NOT NULL,
    `total_hrs` DOUBLE NOT NULL DEFAULT 0,
    `excess_fee` DOUBLE NOT NULL DEFAULT 0,
    `total_fee` DOUBLE NOT NULL DEFAULT 0,
    `total_amount` DOUBLE NOT NULL DEFAULT 0,

    UNIQUE INDEX `ships_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `canals` ADD CONSTRAINT `canals_size_id_fkey` FOREIGN KEY (`size_id`) REFERENCES `canal_size`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `canal_routes` ADD CONSTRAINT `canal_routes_canals_id_fkey` FOREIGN KEY (`canals_id`) REFERENCES `canals`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ships` ADD CONSTRAINT `ships_canal_route_id_fkey` FOREIGN KEY (`canal_route_id`) REFERENCES `canal_routes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
