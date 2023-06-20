import React from "react";
import { useRouter } from "next/router";
import {
  useGetEmployeeInfo,
  useGetMyLatestTelemedicine,
} from "@sehatq/components";
import { GeneralConsultationFormPageMobile } from "./general-consultation-form-mobile";
import { GeneralConsultationFormPageDesktop } from "./general-consultation-form-desktop";

export type GeneralConsultationFormPageProps = {
  isMobile: boolean;
};

export function GeneralConsultationFormPage(
  props: GeneralConsultationFormPageProps
) {
  const { isMobile } = props;
  const router = useRouter();
  const { drugId, drugName } = router.query;
  const { isSuccess, data: employeeInfo } = useGetEmployeeInfo();
  const { data: latestTelemedicine } = useGetMyLatestTelemedicine({
    staleTime: 0,
    cacheTime: 0,
  });

  const getNewProps = () => {
    if (isSuccess && !employeeInfo?.allowFreeChat) {
      return {
        type: "regular" as const,
      };
    } else if (
      drugId &&
      drugName &&
      latestTelemedicine?.hasFreeEthicalDrugConsultation
    ) {
      return {
        type: "ethical-drug" as const,
        drug: {
          id: parseInt(drugId.toString()),
          name: drugName.toString(),
        },
      };
    } else if (
      isSuccess &&
      (latestTelemedicine?.hasFreeCorporateConsultation ||
        !(drugId && drugName))
    ) {
      return {
        type: "corporate" as const,
        ...(drugId && drugName
          ? {
              drug: {
                id: parseInt(drugId.toString()),
                name: drugName.toString(),
              },
            }
          : undefined),
      };
    } else {
      return {
        type: "regular" as const,
        ...(drugId && drugName
          ? {
              drug: {
                id: parseInt(drugId.toString()),
                name: drugName.toString(),
              },
            }
          : undefined),
      };
    }
  };

  const newProps = getNewProps();

  if (isMobile) {
    return <GeneralConsultationFormPageMobile {...newProps} />;
  }
  return <GeneralConsultationFormPageDesktop {...newProps} />;
}
