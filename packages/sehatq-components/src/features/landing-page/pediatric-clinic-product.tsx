import React from "react";

import { PediatricClinicProductMobile } from "./pediatric-clinic-product-mobile";
import { PediatricClinicProductDesktop } from "./pediatric-clinic-product-desktop";

export type PediatricClinicProductProps = { isMobile: boolean };

export function PediatricClinicProduct(props: PediatricClinicProductProps) {
  const { isMobile } = props;
  const newProps = {
    title: "Beli Kebutuhan si Kecil dari Rumah",
    sortBy: "bestseller",
    categorySlug: "ibu-bayi",
    productsNavigation: {
      name: "EXTERNAL_CATEGORY",
      query: { slugUrl: "ibu-bayi" },
    },
  };
  if (isMobile) {
    return <PediatricClinicProductMobile {...newProps} />;
  }
  return <PediatricClinicProductDesktop {...newProps} />;
}
