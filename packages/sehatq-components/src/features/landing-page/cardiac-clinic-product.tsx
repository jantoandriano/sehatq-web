import React from "react";

import { CardiacClinicProductDesktop } from "./cardiac-clinic-product-desktop";
import { CardiacClinicProductMobile } from "./cardiac-clinic-product-mobile";

export type CardiacClinicProductProps = { isMobile: boolean };

export function CardiacClinicProduct(props: CardiacClinicProductProps) {
  const { isMobile } = props;
  const newProps = {
    title: "Harga Terjangkau, Bebas Ongkir",
    sortBy: "bestseller",
    categorySlug: "obat",
    productsNavigation: {
      name: "EXTERNAL_CATEGORY",
      query: { slugUrl: "obat" },
    },
  };
  if (isMobile) {
    return <CardiacClinicProductMobile {...newProps} />;
  }
  return <CardiacClinicProductDesktop {...newProps} />;
}
