import React from "react";
import { MerchantProducts as _MerchantProducts } from "@sehatq/components";
import { ProductDetailParams, ProductDetailQuery } from "@get-props";
import { withQuery } from "@utils";

const MerchantProducts = withQuery(
  _MerchantProducts,
  (query: ProductDetailParams & ProductDetailQuery) => ({
    productSlug: query.slug,
  })
);

export function ProductDetailDesktop() {
  return <MerchantProducts />;
}
