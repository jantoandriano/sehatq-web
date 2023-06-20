import React from "react";
import { ProductDetailDesktop } from "./product-detail-desktop";
import { ProductDetailMobile } from "./product-detail-mobile";

export type ProductDetailProps = { isMobile: boolean };

export function ProductDetail(props: ProductDetailProps) {
  const { isMobile } = props;
  if (isMobile) {
    return <ProductDetailMobile />;
  }
  return <ProductDetailDesktop />;
}
