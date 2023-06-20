import React from "react";

import { NavigationValue } from "@sehatq/utils";
import { ProductsCache, useGetProducts } from "../product/product-queries";
import {
  ClinicProductDesktop,
  ClinicProductSkeletonDesktop,
} from "./clinic-product-desktop";
import {
  ClinicProductMobile,
  ClinicProductSkeletonMobile,
} from "./clinic-product-mobile";

export type ClinicProductProps = {
  title: string;
  isMobile: boolean;
  sortBy: string;
  categorySlug: string;
  productsNavigation: NavigationValue;
};
export type ClinicProductSkeletonProps = { isMobile: boolean };

function selectProductsData(relatedProducts: ProductsCache) {
  return relatedProducts;
}

export function ClinicProduct(props: ClinicProductProps) {
  const { title, isMobile, sortBy, categorySlug, productsNavigation } = props;

  const productsQuery = {
    page: "1",
    perPage: "12",
    sortBy,
    categorySlug,
  };

  const { data: products = [], isLoading } = useGetProducts(productsQuery, {
    select: selectProductsData,
  });

  if (isLoading) {
    return <ClinicProductSkeleton isMobile={isMobile} />;
  }

  const newProps = {
    title,
    products,
    productsNavigation,
  };
  if (isMobile) {
    return <ClinicProductMobile {...newProps} />;
  }
  return <ClinicProductDesktop {...newProps} />;
}

export function ClinicProductSkeleton(props: ClinicProductSkeletonProps) {
  const { isMobile } = props;

  if (isMobile) {
    return <ClinicProductSkeletonMobile />;
  }
  return <ClinicProductSkeletonDesktop />;
}
