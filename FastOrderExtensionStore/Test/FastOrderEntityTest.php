<?php

declare(strict_types=1);

namespace GE\FastOrder\Entity;

use PHPUnit\Framework\TestCase;

class FastOrderEntityTest extends TestCase
{
    public function testGetProductNumber(): void
    {
        $entity = new FastOrderEntity();
        $entity->setProductNumber('ABC123');

        self::assertSame('ABC123', $entity->getProductNumber());
    }

    public function testSetProductNumber(): void
    {
        $entity = new FastOrderEntity();
        $entity->setProductNumber('XYZ789');

        self::assertSame('XYZ789', $entity->getProductNumber());
    }

    public function testGetQuantity(): void
    {
        $entity = new FastOrderEntity();
        $entity->setQuantity(5);

        self::assertSame(5, $entity->getQuantity());
    }

    public function testSetQuantity(): void
    {
        $entity = new FastOrderEntity();
        $entity->setQuantity(10);

        self::assertSame(10, $entity->getQuantity());
    }
}
