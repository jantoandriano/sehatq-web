import React from "react";

import { RelatedProductsDesktop } from "./related-products-desktop";
import { RelatedProductsMobile } from "./related-products-mobile";
import { useGetRelatedProducts, RelatedProductsCache } from "./product-queries";

function selectRelatedProducts(relatedProducts: RelatedProductsCache) {
  return relatedProducts;
}

export type RelatedProductsProps = {
  isMobile?: boolean;
  tagSlug: string;
};

export function RelatedProducts(props: RelatedProductsProps) {
  const { tagSlug, isMobile } = props;
  const {
    data: relatedProducts,
    isLoading,
    error,
  } = useGetRelatedProducts(
    { tagSlug, page: "1", perPage: "4" },
    { select: selectRelatedProducts }
  );

  const basicProps = {
    relatedProducts,
    isLoading: isLoading && !error,
    error,
  };

  if (isMobile) {
    return <RelatedProductsMobile {...basicProps} />;
  }
  return <RelatedProductsDesktop {...basicProps} />;
}
