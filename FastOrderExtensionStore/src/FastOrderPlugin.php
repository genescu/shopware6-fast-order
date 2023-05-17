<?php

declare(strict_types=1);

namespace GE\FastOrder;

use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\ActivateContext;

class FastOrderPlugin extends Plugin
{
    public function activate(ActivateContext $activateContext): void
    {
        $activateContext->setAutoMigrate(false); // disable auto migration execution

        $migrationCollection = $activateContext->getMigrationCollection();

        $migrationCollection->migrateInPlace(16843519521);
    }
}
