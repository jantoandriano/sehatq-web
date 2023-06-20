import React from "react";
import {
  ProductCardDesktop,
  ProductCardDesktopProps,
} from "./product-card-desktop";
import {
  ProductCardMobile,
  ProductCardMobileProps,
} from "./product-card-mobile";

export type ProductCardProps =
  | ({ isMobile: false } & ProductCardDesktopProps)
  | ({ isMobile: true } & ProductCardMobileProps);

export function ProductCard(props: ProductCardProps) {
  if (props.isMobile) {
    return <ProductCardMobile {...props} />;
  }
  return <ProductCardDesktop {...props} />;
}
