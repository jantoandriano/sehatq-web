import React, { useEffect } from "react";
import { generatePriceDisplay, useAssets } from "@sehatq/utils";
import { useClipboard, useToast, useDisclosure } from "../../user-interfaces";
import { useGetEmployeeInfo } from "../profile/employee-info-queries";
import {
  RegularTelemedicineBannerDesktop,
  RegularTelemedicineBannerDesktopSkeleton,
} from "./regular-telemedicine-banner-desktop";
import {
  RegularTelemedicineBannerMobile,
  RegularTelemedicineBannerMobileSkeleton,
} from "./regular-telemedicine-banner-mobile";
import {
  RegularTelemedicineVoucherCache,
  useGetRegularTelemedVoucher,
  useGetRegularTelemedBanner,
  RegularTelemedicineBannerCache,
} from "./regular-telemedicine-banner-queries";

export type RegularTelemedicineBannerProps = {
  isMobile: boolean;
};

function selectVoucher(cache: RegularTelemedicineVoucherCache) {
  return cache.data;
}

function selectBanner(cache: RegularTelemedicineBannerCache) {
  return cache.data;
}

export function RegularTelemedicineBanner(
  props: RegularTelemedicineBannerProps
) {
  const { isMobile } = props;
  const ASSETS = useAssets(["REGULAR_TELEMED_BANNER"]);
  const { isOpen, onClose, onOpen } = useDisclosure();

  // get employee info
  const { data: employeeInfo } = useGetEmployeeInfo();
  const isEmployee = !!employeeInfo?.employeeNumber;
  const allowFreeChat = !!employeeInfo?.allowFreeChat;

  // get voucher
  const { data: voucher, isLoading } = useGetRegularTelemedVoucher({
    select: selectVoucher,
  });

  // get telemedicine banner
  const { data: banner } = useGetRegularTelemedBanner({
    select: selectBanner,
  });

  const voucherCode = voucher?.code;
  const { hasCopied, onCopy } = useClipboard(voucherCode ?? "");
  const toast = useToast();

  useEffect(() => {
    if (hasCopied) {
      toast({
        message: "Kode berhasil disalin",
        status: "success",
      });
    }
  }, [toast, hasCopied, isMobile]);

  if (isLoading) {
    return <RegularTelemedicineBannerSkeleton isMobile={isMobile} />;
  }

  const otherProps = {
    allowFreeChat,
    operationHours: banner?.operationHours,
    operationHourActive: banner?.operationHourActive,
    photoUrl: banner?.photoUrl || ASSETS.REGULAR_TELEMED_BANNER,
    indicator: banner?.indicator,
    consultationFee: allowFreeChat ? "GRATIS" : generatePriceDisplay(5000),
    consultationStrikeFee: isEmployee ? generatePriceDisplay(5000) : undefined,
    voucherCode: isEmployee ? undefined : voucherCode,
    isCorporate: isEmployee,
    onCopy,
    onShowTelemedicineInfo: onOpen,
    isOpenTelemedicineInfo: isOpen,
    onCloseTelemedicineInfo: onClose,
  };

  if (isMobile) {
    return <RegularTelemedicineBannerMobile {...otherProps} />;
  }

  return <RegularTelemedicineBannerDesktop {...otherProps} />;
}

export type RegularTelemedicineBannerSkeletonProps = {
  isMobile: boolean;
};

export function RegularTelemedicineBannerSkeleton(
  props: RegularTelemedicineBannerSkeletonProps
) {
  const { isMobile } = props;

  if (isMobile) {
    return <RegularTelemedicineBannerMobileSkeleton />;
  }
  return <RegularTelemedicineBannerDesktopSkeleton />;
}
