<?php

declare(strict_types=1);

namespace GE\FastOrder\Storefront\Controller;

use GE\FastOrder\Service\FastOrderService;
use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Content\Product\ProductCollection;
use Shopware\Core\Framework\Context;
use Shopware\Core\Framework\Routing\Exception\MissingRequestParameterException;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * @Route(defaults={"_routeScope"={"storefront"}})
 */
class FastOrderController extends StorefrontController
{
    protected fastOrderService $fastOrderService;

    public function __construct(fastOrderService $fastOrderService)
    {
        $this->fastOrderService = $fastOrderService;
    }

    /**
     * @Route("/fast-order", name="frontend.fast-order.page", methods={"GET"})
     */
    public function renderFastOrder(SalesChannelContext $salesContext): Response
    {
        return $this->renderStorefront(
            '@GEfastOrder/storefront/page/fast-order.html.twig',
            [
                'currency' => $salesContext->getCurrency()
                    ->getSymbol(),
            ]
        );
    }

    /**
     * @Route("/fast-order/suggest/{search}", name="frontend.fast-order.suggest", methods={"GET"}, defaults={"XmlHttpRequest"=true}))
     *
     * @return JsonResponse
     */
    public function getSuggestion(
        Request $request,
        Cart $cart,
        Context $context,
        SalesChannelContext $salesContext
    ): Response {
        $search = $request->attributes->getAlnum('search');

        if (! $search) {
            throw new MissingRequestParameterException('search');
        }

        $activeProductsRepository = $this->container->get('product.repository');
        $activeProducts = $this->fastOrderService->searchAvailableProducts(
            $activeProductsRepository,
            $search,
            $context
        );

        $products = $this->prepareSuggestionResults($activeProducts, $salesContext);

        return $this->renderStorefront(
            '@Storefront/storefront/page/component/fast-order-items.html.twig',
            [
                'products' => $products,
            ]
        );
    }

    /**
     * @Route("/fast-order/add-cart", name="frontend.fast-order.add-cart", methods={"POST"})
     */
    public function sendProductsToCart(
        Request $request,
        Cart $cart,
        Context $context,
        SalesChannelContext $salesContext
    ): Response {
        $productEntityRepository = $this->container->get('product.repository');
        $fastOrderEntityRepository = $this->container->get('fast_order.repository');

        $itemsShoppingCart = $this->getItemsShoppingCart($request);

        $activeProducts = $this->fastOrderService->getAvailableProducts(
            $productEntityRepository,
            array_keys($itemsShoppingCart),
            $context
        );

        $lineItem = $this->fastOrderService->prepareLineItems($activeProducts, $itemsShoppingCart, $salesContext);
        $this->fastOrderService->addToCart($cart, $lineItem, $salesContext);
        $this->fastOrderService->storeLineItems(
            $fastOrderEntityRepository,
            $activeProducts,
            $itemsShoppingCart,
            $salesContext,
            $context
        );

        return $this->redirectToRoute('frontend.checkout.cart.page');
    }

    protected function prepareSuggestionResults(ProductCollection $products, SalesChannelContext $salesContext): array
    {
        $collection = [];

        if (empty($products)) {
            return $collection;
        }

        foreach ($products as $product) {
            $price = $product->getPrice()
                ->getCurrencyPrice($salesContext->getCurrency()->getId());
            $collection[] =
                [
                    'productNumber' => $product->getProductNumber(),
                    'stock' => $product->getStock(),
                    'price' => $price->getGross(),
                ];
        }

        return $collection;
    }

    protected function getItemsShoppingCart(Request $request): array
    {
        $products = $request->get('products');
        if (empty($products)) {
            return [];
        }
        return array_filter(array_combine(
            array_map('trim', array_column($products, 'number')),
            array_map('intval', array_column($products, 'quantity')),
        )) ?? [];
    }
}
