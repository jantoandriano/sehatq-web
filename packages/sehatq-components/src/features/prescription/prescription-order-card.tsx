import React from "react";
import { useNavigation } from "@sehatq/utils";

import { useDisclosure } from "../../user-interfaces";
import {
  PrescriptionOrderCardMobile,
  PrescriptionOrderCardSkeletonMobile,
} from "./prescription-order-card-mobile";
import {
  PrescriptionOrderCardDesktop,
  PrescriptionOrderCardSkeletonDesktop,
} from "./prescription-order-card-desktop";
import { PrescriptionCache, useGetPrescription } from "./prescription-queries";

export type PrescriptionOrderCardProps = {
  isMobile?: boolean;
  prescriptionNo: string;
};

function selectTelemedicineDoctor(prescription: PrescriptionCache) {
  const { orders } = prescription.data;
  return orders;
}

export function PrescriptionOrderCard(props: PrescriptionOrderCardProps) {
  const { isMobile, prescriptionNo } = props;
  const { navigate } = useNavigation();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: prescription, isLoading } = useGetPrescription(
    { prescriptionNo },
    { select: selectTelemedicineDoctor }
  );

  function handleOpenDetail(haveMultipleOrders: boolean) {
    if (haveMultipleOrders) {
      onOpen();
    } else {
      const splitMerchantNo = prescription?.merchantOrders[0].number.split("-");
      if (splitMerchantNo) {
        navigate("EXTERNAL_PROFILE_ORDER_DETAIL", {
          coNumber: splitMerchantNo[0],
          moSequence: splitMerchantNo[1],
        });
      }
    }
  }

  const newProps = {
    prescription,
    handleOpenDetail,
    isOpen,
    onClose,
  };

  if (isLoading) return <PrescriptionOrderCardSkeleton isMobile={isMobile} />;

  if (isMobile) {
    return <PrescriptionOrderCardMobile {...newProps} />;
  }
  return <PrescriptionOrderCardDesktop {...newProps} />;
}

export type PrescriptionOrderCardSkeletonProps = {
  isMobile?: boolean;
};

export function PrescriptionOrderCardSkeleton(
  props: PrescriptionOrderCardSkeletonProps
) {
  if (props.isMobile) return <PrescriptionOrderCardSkeletonMobile />;
  return <PrescriptionOrderCardSkeletonDesktop />;
}
