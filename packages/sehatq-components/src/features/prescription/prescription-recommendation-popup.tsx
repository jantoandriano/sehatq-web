import React from "react";
import { useDisclosure } from "../../user-interfaces";
import {
  PrescriptionRecommendationPopupMobile,
  PrescriptionRecommendationPopupSkeletonMobile,
} from "./prescription-recommendation-popup-mobile";
import {
  PrescriptionRecommendationPopupDesktop,
  PrescriptionRecommendationPopupSkeletonDesktop,
} from "./prescription-recommendation-popup-desktop";
import {
  PrescriptionProductsCache,
  useGetPrescriptionProducts,
} from "./prescription-products-queries";
import { PrescriptionStatusCode } from "./prescription-constant";

export type PrescriptionRecommendationPopupProps = {
  isMobile?: boolean;
  prescriptionNo: string;
  status: PrescriptionStatusCode;
  source: string;
};

function selectPrescriptionProducts(prescription: PrescriptionProductsCache) {
  return {
    data: prescription.data,
    productsReplacement: prescription.data.filter(
      (product) => !!product.isReplacement
    ),
  };
}

export function PrescriptionRecommendationPopup(
  props: PrescriptionRecommendationPopupProps
) {
  const { isMobile, prescriptionNo, status, source } = props;
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    data: prescriptionProducts,
    isLoading,
    error,
  } = useGetPrescriptionProducts(
    { prescriptionNo },
    { select: selectPrescriptionProducts }
  );

  const newProps = {
    onOpen,
    isOpen,
    onClose,
    status,
    source,
    prescriptionProducts: error ? [] : prescriptionProducts?.data ?? [],
    productsReplacement: error
      ? []
      : prescriptionProducts?.productsReplacement ?? [],
  };

  if (isLoading)
    return <PrescriptionRecommendationPopupSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionRecommendationPopupMobile {...newProps} />;
  }
  return <PrescriptionRecommendationPopupDesktop {...newProps} />;
}

export type PrescriptionRecommendationPopupSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionRecommendationPopupSkeleton(
  props: PrescriptionRecommendationPopupSkeletonProps
) {
  if (props.isMobile) return <PrescriptionRecommendationPopupSkeletonMobile />;
  return <PrescriptionRecommendationPopupSkeletonDesktop />;
}
