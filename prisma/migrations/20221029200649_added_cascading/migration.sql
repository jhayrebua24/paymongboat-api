-- DropForeignKey
ALTER TABLE `canal_routes` DROP FOREIGN KEY `canal_routes_canals_id_fkey`;

-- DropForeignKey
ALTER TABLE `ships` DROP FOREIGN KEY `ships_canal_route_id_fkey`;

-- AddForeignKey
ALTER TABLE `canal_routes` ADD CONSTRAINT `canal_routes_canals_id_fkey` FOREIGN KEY (`canals_id`) REFERENCES `canals`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `ships` ADD CONSTRAINT `ships_canal_route_id_fkey` FOREIGN KEY (`canal_route_id`) REFERENCES `canal_routes`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
