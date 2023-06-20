import {
  AdSlot,
  BasicHCPProfileCard,
  Box,
  GridBlock,
  GridBlockItem,
  HCPBookingButton,
  HCPProfileContent,
  HCPSchedulesList,
  VStack,
  Text,
  SehatQFooter,
} from "@sehatq/components";
import React from "react";
import { HCPGPTProvider } from "@components/gpt-provider/hcp";
import { HealthCareProfessionalHead } from "@components/head/health-care-professional";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export type HealthCareProfessionalDesktopProps = {
  isMobile: boolean;
  hcpSlug: string;
  hcfId?: string;
  date?: string;
};

export function HealthCareProfessionalDesktop(
  props: HealthCareProfessionalDesktopProps
) {
  return (
    <>
      <HealthCareProfessionalHead />
      <HCPGPTProvider {...props}>
        <>
          <Box background="linear-gradient( #F0F9FA 62%, white 38%)">
            <SehatqNavbar withCompanyPartner />
            <GridBlock my={12} isReverse>
              <GridBlockItem>
                <HCPSchedulesList key={props.hcfId} {...props} />
                <Box my={6}>
                  <HCPProfileContent {...props} />
                </Box>
                <Text fontSize="xs" color="brownGrey.500" fontWeight="semibold">
                  Disclaimer
                </Text>
                <Text fontSize="xs" color="brownGrey.500">
                  Informasi dan foto disadur dari berbagai sumber, termasuk
                  namun tidak terbatas pada informasi langsung dari fasilitas
                  kesehatan dan/atau dokter terkait, situs resmi fasilitas
                  kesehatan terkait, verifikasi melalui surat elektronik dan
                  telepon, dan informasi online.Seluruh informasi dan foto hanya
                  untuk tujuan informasi dan direktori. Kami berusaha agar foto
                  dan informasi yang tercantum tetap mutakhir dan akurat, namun
                  kami tidak menjamin mengenai kelengkapan, keakuratan dan
                  keandalan terkait dengan foto dan informasi yang tercantum,
                  yang mana dapat diubah sewaktu-waktu oleh fasilitas kesehatan
                  dan/atau dokter terkait.
                </Text>
              </GridBlockItem>
              <GridBlockItem>
                <VStack spacing={4} position="sticky" top="144px">
                  <BasicHCPProfileCard {...props} />
                  <HCPBookingButton />
                  <AdSlot divId="div-gpt-ad-mr1" />
                </VStack>
              </GridBlockItem>
            </GridBlock>
          </Box>
          <Box marginBottom={10} marginTop={32}>
            <SehatQFooter {...props} />
          </Box>
        </>
      </HCPGPTProvider>
    </>
  );
}
