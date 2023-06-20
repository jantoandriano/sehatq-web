import {
  ConsultationForm,
  ConsultationRedirection,
  GeneralConsultationHCPInfo,
  VStack,
} from "@sehatq/components";
import React from "react";
import { SehatQHeader } from "@components/ui/sehatq-header";

export type GeneralConsultationFormPageMobileProps =
  | {
      type: "ethical-drug";
      drug: {
        id: number;
        name: string;
      };
    }
  | {
      type: "corporate" | "regular";
      drug?: {
        id: number;
        name: string;
      };
    };

export function GeneralConsultationFormPageMobile(
  props: GeneralConsultationFormPageMobileProps
) {
  return (
    <>
      <SehatQHeader variant="text" text="Form Konsultasi" />
      <VStack align="start" p={4} spacing={4}>
        <GeneralConsultationHCPInfo isMobile />
        <ConsultationRedirection currentNavigationName="TELEMED_GENERAL_CHAT_FORM">
          <ConsultationForm isMobile {...props} />
        </ConsultationRedirection>
      </VStack>
    </>
  );
}
