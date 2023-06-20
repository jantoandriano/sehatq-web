import React from "react";
import { useGetPrescription } from "./prescription-queries";
import { BuyPrescriptionPopupDesktop } from "./buy-prescription-popup-desktop";
import { BuyPrescriptionPopupMobile } from "./buy-prescription-popup-mobile";

export type BuyPrescriptionPopupProps = {
  isMobile?: boolean;
  consultationId: string;
  isOpen: boolean;
  onClose: () => void;
};

export function BuyPrescriptionPopup(props: BuyPrescriptionPopupProps) {
  const { consultationId, isOpen, onClose, isMobile } = props;
  const { data, isLoading } = useGetPrescription(
    {
      consultationId,
    },
    { enabled: isOpen }
  );
  const otherProps = {
    prescriptionNo: data?.prescriptionNo ?? "",
    productNames: data?.products.map((product) => product.name) ?? [],
    isLoading,
    isOpen,
    onClose,
  };

  if (isMobile) {
    return <BuyPrescriptionPopupMobile {...otherProps} />;
  }

  return <BuyPrescriptionPopupDesktop {...otherProps} />;
}
