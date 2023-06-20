import React from "react";
import {
  GridBlock,
  GridBlockItem,
  Box,
  VStack,
  SehatQFooter,
  MyMentalRecord,
  Text,
  Link,
  useImage,
} from "@sehatq/components";
import { useAssets, useNavigation } from "@sehatq/utils";
import { SehatqNavbar } from "@components/ui/sehatq-navbar";

export type MyMentalRecordDesktopProps = {
  isMobile: boolean;
  mentalId: string;
};

export function MyMentalRecordDesktop(props: MyMentalRecordDesktopProps) {
  const ASSETS = useAssets(["BANNER_ADS"]);
  const { Navigate } = useNavigation();
  const Image = useImage();
  return (
    <>
      <SehatqNavbar withCompanyPartner />
      <GridBlock my={6} isReverse>
        <GridBlockItem>
          <VStack align="normal" spacing={7} width={760}>
            <Text fontFamily="poppins" fontWeight="semibold" fontSize="3xl">
              Hasil Cek Kesehatan Mental
            </Text>
            <MyMentalRecord {...props} />
          </VStack>
        </GridBlockItem>
        <GridBlockItem>
          <Box position="sticky" top="144px">
            <Navigate name="TELEMEDICINES">
              <Link width="100%">
                <Image
                  src={ASSETS.BANNER_ADS}
                  alt="Chat Dokter"
                  width={300}
                  height={556}
                  priority={true}
                  wrapperProps={{
                    borderRadius: "xl",
                    overflow: "hidden",
                  }}
                />
              </Link>
            </Navigate>
          </Box>
        </GridBlockItem>
      </GridBlock>
      <Box marginBottom={10} marginTop={32}>
        <SehatQFooter {...props} />
      </Box>
    </>
  );
}
