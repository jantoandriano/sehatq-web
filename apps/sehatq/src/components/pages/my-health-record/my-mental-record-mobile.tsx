import React from "react";
import { Box, VStack, SehatQFooter, MyMentalRecord } from "@sehatq/components";
import { SehatQHeader } from "@components/ui/sehatq-header";

export type MyMentalRecordMobileProps = {
  isMobile: boolean;
  mentalId: string;
};

export function MyMentalRecordMobile(props: MyMentalRecordMobileProps) {
  return (
    <>
      <SehatQHeader variant="text" text="Hasil Cek Kesehatan Mental" />
      <VStack align="normal" spacing={3.5}>
        <MyMentalRecord {...props} />
      </VStack>

      <Box background="white" p={3} pt={7} align="normal">
        <SehatQFooter {...props} />
      </Box>
    </>
  );
}
