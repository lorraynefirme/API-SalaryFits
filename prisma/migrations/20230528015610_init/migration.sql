-- CreateTable
CREATE TABLE `LaunchesTable` (
    `id` VARCHAR(191) NOT NULL,
    `static_fire_date_utc` VARCHAR(191) NULL,
    `static_fire_date_unix` INTEGER NULL,
    `net` BOOLEAN NULL,
    `window` INTEGER NULL,
    `rocket` VARCHAR(191) NULL,
    `success` BOOLEAN NULL,
    `details` VARCHAR(191) NULL,
    `launchpad` VARCHAR(191) NULL,
    `flight_number` INTEGER NULL,
    `name` VARCHAR(191) NULL,
    `date_utc` VARCHAR(191) NULL,
    `date_unix` INTEGER NULL,
    `date_local` VARCHAR(191) NULL,
    `date_precision` VARCHAR(191) NULL,
    `upcoming` BOOLEAN NOT NULL,

    UNIQUE INDEX `LaunchesTable_id_key`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
