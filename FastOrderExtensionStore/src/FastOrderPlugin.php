<?php

declare(strict_types=1);

namespace GE\FastOrder;

use Doctrine\DBAL\Connection;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\InstallContext;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;

class FastOrderPlugin extends Plugin
{
    public function install(InstallContext $installContext): void
    {
        $this->container->get(Connection::class)->executeStatement(
            '
            CREATE TABLE IF NOT EXISTS `fast_order` (
            `id` BINARY(16) NOT NULL,
            `product_number` VARCHAR (64) NOT NULL,
            `quantity` INT NOT NULL,
            `version_id` varchar(50) NOT NULL,
            `created_at` DATETIME(3) NOT NULL,
            `updated_at` DATETIME(3) NOT NULL,
            PRIMARY KEY (`id`)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        '
        );
    }

    public function uninstall(UninstallContext $uninstallContext): void
    {
        if ($uninstallContext->keepUserData()) {
            return;
        }

        $this->container->get(Connection::class)->executeStatement('DROP TABLE IF EXISTS `fast_order`');
    }
}
