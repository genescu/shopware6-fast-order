<?php

declare(strict_types=1);

namespace GE\FastOrder\Entity;

use Shopware\Core\Framework\DataAbstractionLayer\EntityDefinition;
use Shopware\Core\Framework\DataAbstractionLayer\Field\DateTimeField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\PrimaryKey;
use Shopware\Core\Framework\DataAbstractionLayer\Field\Flag\Required;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IdField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\IntField;
use Shopware\Core\Framework\DataAbstractionLayer\Field\StringField;
use Shopware\Core\Framework\DataAbstractionLayer\FieldCollection;

class FastOrderDefinition extends EntityDefinition
{
    public const ENTITY_NAME = 'fast_order';

    public function getEntityName(): string
    {
        return self::ENTITY_NAME;
    }

    public function getEntityClass(): string
    {
        return FastOrderEntity::class;
    }

    protected function defineFields(): FieldCollection
    {
        return new FieldCollection(
            [
                (new IdField('id', 'id'))->addFlags(new Required(), new PrimaryKey()),
                (new StringField('product_number', 'product_number'))->addFlags(new Required()),
                (new IntField('quantity', 'quantity'))->addFlags(new Required()),
                (new StringField('version_id', 'version_id'))->addFlags(new Required()),
                (new DateTimeField('created_at', 'created_at'))->addFlags(new Required()),
            ]
        );
    }
}
