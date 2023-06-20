import React from "react";

import { InternistClinicProductMobile } from "./internist-clinic-product-mobile";
import { InternistClinicProductDesktop } from "./internist-clinic-product-desktop";

export type InternistClinicProductProps = { isMobile: boolean };

export function InternistClinicProduct(props: InternistClinicProductProps) {
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
    return <InternistClinicProductMobile {...newProps} />;
  }
  return <InternistClinicProductDesktop {...newProps} />;
}
