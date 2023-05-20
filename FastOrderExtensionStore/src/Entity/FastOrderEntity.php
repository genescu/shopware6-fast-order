<?php

declare(strict_types=1);

namespace GE\FastOrder\Entity;

use Shopware\Core\Framework\DataAbstractionLayer\Entity;
use Shopware\Core\Framework\DataAbstractionLayer\EntityIdTrait;

class FastOrderEntity extends Entity
{
    use EntityIdTrait;

    protected string $product_number;

    protected int $quantity;

    public function getProductNumber(): string
    {
        return $this->product_number;
    }

    public function setProductNumber(string $product_number): void
    {
        $this->product_number = $product_number;
    }

    public function getQuantity(): int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }
}
