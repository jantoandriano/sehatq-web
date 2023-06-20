import {
  AdSlot,
  BasicHCPProfileCard,
  Box,
  HCPBookingButton,
  HCPProfileContent,
  HCPSchedulesList,
  SehatQFooter,
  Text,
} from "@sehatq/components";
import React from "react";
import { HCPGPTProvider } from "@components/gpt-provider/hcp";
import { HealthCareProfessionalHead } from "@components/head/health-care-professional";
import { SehatQHeader } from "@components/ui/sehatq-header";

export type HealthCareProfessionalMobileProps = {
  isMobile: boolean;
  hcpSlug: string;
  hcfId?: string;
  date?: string;
};

export function HealthCareProfessionalMobile(
  props: HealthCareProfessionalMobileProps
) {
  return (
    <>
      <HealthCareProfessionalHead />
      <HCPGPTProvider {...props}>
        <>
          <SehatQHeader variant="text" text="Cari Dokter" />
          <Box pt={3}>
            <AdSlot divId="div-gpt-ad-leaderboard" />
          </Box>
          <Box py={6} px={3} mb="10">
            <BasicHCPProfileCard {...props} />
            <Text
              py="6"
              color="charcoalGrey"
              fontSize="md"
              fontFamily="poppins"
              fontWeight="semibold"
            >
              Lokasi dan Jadwal Praktik
            </Text>
            <HCPSchedulesList key={props.hcfId} {...props} />
            <Box my={6}>
              <HCPProfileContent {...props} />
            </Box>
            <AdSlot divId="div-gpt-ad-flyingcarpet" variant="flying-carpet" />
            <Text
              mt={6}
              mb={2}
              fontSize="xs"
              color="brownGrey.500"
              fontWeight="semibold"
            >
              Disclaimer
            </Text>
            <Text mb={6} fontSize="xs" color="brownGrey.500">
              Informasi dan foto disadur dari berbagai sumber, termasuk namun
              tidak terbatas pada informasi langsung dari fasilitas kesehatan
              dan/atau dokter terkait, situs resmi fasilitas kesehatan terkait,
              verifikasi melalui surat elektronik dan telepon, dan informasi
              online.Seluruh informasi dan foto hanya untuk tujuan informasi dan
              direktori. Kami berusaha agar foto dan informasi yang tercantum
              tetap mutakhir dan akurat, namun kami tidak menjamin mengenai
              kelengkapan, keakuratan dan keandalan terkait dengan foto dan
              informasi yang tercantum, yang mana dapat diubah sewaktu-waktu
              oleh fasilitas kesehatan dan/atau dokter terkait.
            </Text>
            <AdSlot divId="div-gpt-ad-middleleaderboard" />
          </Box>
          <Box background="white" p={3} align="normal">
            <SehatQFooter {...props} />
          </Box>
          <AdSlot divId="div-gpt-ad-sticky" variant="fixed" bottom="72px" />
          <HCPBookingButton isMobile />
        </>
      </HCPGPTProvider>
    </>
  );
}
