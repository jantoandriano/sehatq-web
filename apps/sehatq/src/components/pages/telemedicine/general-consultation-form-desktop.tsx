import {
  Box,
  ConsultationDisclaimer,
  ConsultationForm,
  GeneralConsultationHCPInfo,
  GridBlock,
  GridBlockItem,
  SimpleSehatQFooter,
  ConsultationRedirection,
  VStack,
} from "@sehatq/components";
import React from "react";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export type GeneralConsultationFormPageDesktopProps =
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

export function GeneralConsultationFormPageDesktop(
  props: GeneralConsultationFormPageDesktopProps
) {
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <ConsultationRedirection currentNavigationName="TELEMED_GENERAL_CHAT_FORM">
            <ConsultationForm {...props} />
          </ConsultationRedirection>
        </GridBlockItem>
        <GridBlockItem>
          <VStack spacing={6}>
            <GeneralConsultationHCPInfo />
            <ConsultationDisclaimer isFullWidth />
          </VStack>
        </GridBlockItem>
      </GridBlock>
      <Box marginTop={10}>
        <SimpleSehatQFooter isMobile={false} {...props} />
      </Box>
    </>
  );
}
