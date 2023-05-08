<?php

declare(strict_types=1);

namespace GE\FastOrder\Storefront\Controller;

use GE\FastOrder\Service\FastOrderService;
use Shopware\Core\Checkout\Cart\Cart;
use Shopware\Core\Framework\Context;
use Shopware\Core\System\SalesChannel\SalesChannelContext;
use Shopware\Storefront\Controller\StorefrontController;
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
    public function renderFastOrder(): Response
    {
        return $this->renderStorefront('@GEfastOrder/storefront/page/fast-order.html.twig');
    }

    /**
     * @Route("/fast-order/add-cart", name="frontend.fast-order.add-cart", methods={"POST"})
     */
    public function sendProductsToCart(Request $request, Cart $cart, Context $context, SalesChannelContext $salesContext): Response
    {
        $activeProductsRepository = $this->container->get('product.repository');

        $itemsShoppingCart = $this->getItemsShoppingCart($request);

        $activeProducts = $this->fastOrderService->getAvailableProducts(
            $activeProductsRepository,
            array_keys($itemsShoppingCart),
            $context
        );

        $lineItems = $this->fastOrderService->prepareLineItems($activeProducts, $itemsShoppingCart, $salesContext);

        $this->fastOrderService->addToCart($cart, $lineItems, $salesContext);

        return $this->redirectToRoute('frontend.checkout.cart.page');
    }

    protected function getItemsShoppingCart(Request $request): array
    {
        $products = $request->get('products');

        return array_filter(array_combine(
            array_map('trim', array_column($products, 'number')),
            array_map('intval', array_column($products, 'quantity')),
        )) ?? [];
    }
}
