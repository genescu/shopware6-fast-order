<?php

declare(strict_types=1);

namespace GE\FastOrder\Service;

use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Checkout\Cart\LineItem\LineItem;
use Shopware\Core\Checkout\Cart\LineItemFactoryRegistry;
use Shopware\Core\Checkout\Cart\SalesChannel\CartService;
use Shopware\Core\Content\Product\ProductCollection;
use Shopware\Core\Defaults;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\DataAbstractionLayer\EntityRepository;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Criteria;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\ContainsFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsAnyFilter;
use Shopware\Core\Framework\DataAbstractionLayer\Search\Filter\EqualsFilter;
use Shopware\Core\System\SalesChannel\SalesChannelContext;

class FastOrderService
{
    protected LineItemFactoryRegistry $lineItemFactoryRegistry;

    protected CartService $cartService;

    public function __construct(LineItemFactoryRegistry $lineItemFactoryRegistry, CartService $cartService)
    {
        $this->lineItemFactoryRegistry = $lineItemFactoryRegistry;
        $this->cartService = $cartService;
    }

    public function searchAvailableProducts(
        EntityRepository $entityRepository,
        string $search,
        Context $context
    ): ProductCollection {
        $criteria = (new Criteria())
            ->addFilter(new EqualsFilter('active', true))
            ->addFilter(new ContainsFilter('productNumber', $search))
            ->setLimit(5);

        return $entityRepository->search($criteria, $context)
            ->getEntities();
    }

    public function getAvailableProducts(
        EntityRepository $entityRepository,
        array $productNumbers,
        Context $context
    ): ProductCollection {
        $criteria = (new Criteria())
            ->addFilter(new EqualsFilter('active', true))
            ->addFilter(new EqualsAnyFilter('productNumber', $productNumbers));

        return $entityRepository->search($criteria, $context)
            ->getEntities();
    }

    public function prepareLineItems(
        ProductCollection $productCollection,
        array $productQuantityMap,
        SalesChannelContext $salesContext
    ): array {
        $lineItem = [];
        foreach ($productCollection as $product) {
            $lineItem[] = $this->lineItemFactoryRegistry->create([
                'type' => LineItem::PRODUCT_LINE_ITEM_TYPE,
                'referencedId' => $product->getId(),
                'quantity' => $productQuantityMap[$product->getProductNumber()],
                'payload' => [],
            ], $salesContext);
        }
        return $lineItem;
    }

    public function storeLineItems(
        EntityRepository $entityRepository,
        ProductCollection $productCollection,
        array $productQuantityMap,
        SalesChannelContext $salesContext,
        Context $context
    ): void {
        foreach ($productCollection as $product) {
            $fastOrderItem = [
                'product_number' => $product->getProductNumber(),
                'quantity' => $productQuantityMap[$product->getProductNumber()],
                'version_id' => $salesContext->getToken(),
                'created_at' => $salesContext->getCurrentCustomerGroup()
                    ->getCreatedAt()
                    ->format(Defaults::STORAGE_DATE_TIME_FORMAT),
            ];
            $entityRepository->create([$fastOrderItem], $context);
        }
    }

    public function addToCart(Cart $cart, array $itemsCollection, SalesChannelContext $salesChannelContext): void
    {
        $this->cartService->add($cart, $itemsCollection, $salesChannelContext);
    }
}
