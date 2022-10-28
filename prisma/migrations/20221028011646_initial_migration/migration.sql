-- CreateTable
CREATE TABLE `Canals` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(191) NOT NULL,
    `size` ENUM('small', 'medium', 'large') NOT NULL DEFAULT 'small',
    `length` DOUBLE NOT NULL DEFAULT 0,
    `is_close` BOOLEAN NOT NULL DEFAULT false,
    `direction` ENUM('northbound', 'southbound', 'nortbound_southbound') NOT NULL DEFAULT 'nortbound_southbound',

    UNIQUE INDEX `Canals_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Ships` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `canal_id` INTEGER NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `type` ENUM('off_shore', 'container', 'bulk_carriers') NOT NULL DEFAULT 'off_shore',

    UNIQUE INDEX `Ships_name_key`(`name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Ships` ADD CONSTRAINT `Ships_canal_id_fkey` FOREIGN KEY (`canal_id`) REFERENCES `Canals`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
