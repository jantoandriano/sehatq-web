import React, { useState, useEffect, MouseEvent } from "react";
import { useAtom } from "jotai";
import { useInView } from "react-intersection-observer";
import { useGetProduct, ProductCache } from "./product-queries";
import {
  useGetInfiniteMerchantProducts,
  InfiniteMerchantProductCache,
} from "./merchant-product-queries";
import { MerchantProduct } from "./merchant-product-model";
import {
  merchantProductAtom,
  productQuantityAtom,
  merchantProductSortByAtom,
} from "./product-atoms";
import { MerchantProductsDesktop } from "./merchant-products-desktop";
import { MerchantProductsMobile } from "./merchant-products-mobile";
import { PRODUCT_TYPES } from "./product-constants";

function selectProductType(product: ProductCache) {
  return product.productType;
}

function selectMerchantProducts(
  merchantProducts: InfiniteMerchantProductCache
) {
  return merchantProducts.pages.reduce<MerchantProduct[]>(
    (oldItems, page) => [...oldItems, ...page.data],
    []
  );
}

function selectMerchantProductsPagination(
  merchantProducts: InfiniteMerchantProductCache
) {
  return merchantProducts.pages[merchantProducts.pages.length - 1].pagination;
}

export type MerchantProductsProps = {
  isMobile?: boolean;
  merchantId?: number;
  productSlug: string;
};

export function MerchantProducts(props: MerchantProductsProps) {
  const { isMobile = false, merchantId, productSlug } = props;
  const { ref: refInView, inView } = useInView();

  const merchantProductsQuery = {
    productSlug,
    merchantId: merchantId?.toString() || "",
    perPage: "5",
    sortBy: "",
    page: "1",
    long: "",
    lat: "",
  };

  const {
    fetchNextPage,
    isFetchingNextPage,
    data: merchantProducts,
    isLoading,
    error,
  } = useGetInfiniteMerchantProducts(merchantProductsQuery, {
    select: selectMerchantProducts,
  });
  const { data: pagination } = useGetInfiniteMerchantProducts(
    merchantProductsQuery,
    { select: selectMerchantProductsPagination }
  );
  const hasAnotherMerchantProducts =
    pagination && !error
      ? pagination.page * pagination.perPage < pagination.total
      : false;
  const { data: productType = PRODUCT_TYPES.GENERAL } = useGetProduct(
    { slug: productSlug },
    { select: selectProductType }
  );
  const [atomMerchantProductSortBy] = useAtom(merchantProductSortByAtom);
  const [atomMerchantProduct, setAtomMerchantProduct] =
    useAtom(merchantProductAtom);
  const [, setAtomProductQuantity] = useAtom(productQuantityAtom);
  const [
    stateMerchantProductForShippingInfo,
    setStateMerchantProductForShippingInfo,
  ] = useState<MerchantProduct | null>(null);
  useEffect(() => {
    if (inView && !isFetchingNextPage && hasAnotherMerchantProducts) {
      fetchNextPage();
    }
  }, [inView, isFetchingNextPage, hasAnotherMerchantProducts, fetchNextPage]);
  function onOpenShippingInfo(
    merchantProduct: MerchantProduct,
    clickAllowed?: () => boolean
  ) {
    return (event: MouseEvent) => {
      if (clickAllowed && !clickAllowed()) return;
      event.preventDefault();
      event.stopPropagation();
      setStateMerchantProductForShippingInfo(merchantProduct);
    };
  }
  function onCloseShippingInfo() {
    setStateMerchantProductForShippingInfo(null);
  }
  function updateSelectedMerchantProduct(merchantProduct: MerchantProduct) {
    setAtomProductQuantity(merchantProduct.stock > 0 ? 1 : 0);
    setAtomMerchantProduct(merchantProduct);
  }
  const baseProps = {
    productType,
    merchantProducts,
    atomMerchantProduct,
    atomMerchantProductSortBy,
    updateSelectedMerchantProduct,
    isLoading: isLoading && !error,
    fetchNextPage,
    onOpenShippingInfo,
    onCloseShippingInfo,
    hasAnotherMerchantProducts,
    stateMerchantProductForShippingInfo,
    isOpenShippingInfo: Boolean(stateMerchantProductForShippingInfo),
  };
  if (isMobile)
    return <MerchantProductsMobile {...baseProps} refInView={refInView} />;
  return <MerchantProductsDesktop {...baseProps} />;
}
