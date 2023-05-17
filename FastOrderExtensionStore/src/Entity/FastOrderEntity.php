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

    /**
     * @return string
     */
    public function getProductNumber(): string
    {
        return $this->product_number;
    }

    /**
     * @param string $product_number
     */
    public function setProductNumber(string $product_number): void
    {
        $this->product_number = $product_number;
    }


    /**
     * @return int
     */
    public function getQuantity(): int
    {
        return $this->quantity;
    }

    /**
     * @param int $quantity
     */
    public function setQuantity(int $quantity): void
    {
        $this->quantity = $quantity;
    }
}
