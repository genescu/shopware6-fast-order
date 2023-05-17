<?php

declare(strict_types=1);

namespace GE\FastOrder\Migration;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Migration\MigrationStep;

class Migration16843519521FastOrderTable extends MigrationStep
{
    public function getCreationTimestamp(): int
    {
        return 1546422281;
    }

    public function update(Connection $connection): void
    {
        $connection->executeStatement(
            '
            CREATE TABLE IF NOT EXISTS `fast_order` (
            `id` BINARY(16) NOT NULL,
            `product_number` VARCHAR (64) NOT NULL,
            `quantity` INT NOT NULL,
            `version_id` varchar(50) NOT NULL,
            `created_at` DATETIME(3) NOT NULL,
            PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        '
        );
    }

    public function updateDestructive(Connection $connection): void
    {
        // implement update destructive
    }
}
