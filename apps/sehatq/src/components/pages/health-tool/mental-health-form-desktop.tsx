import React from "react";
import {
  Box,
  Button,
  Text,
  SimpleBlock,
  SehatQFooter,
} from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { MentalHealthFormHead } from "@components/head";

export type MentalHealthFormDesktopProps = {
  isMobile: boolean;
  container: React.MutableRefObject<HTMLDivElement | null>;
  handleOpenTypeform: () => void;
};

export function MentalHealthFormDesktop(props: MentalHealthFormDesktopProps) {
  const { container, handleOpenTypeform } = props;
  const ASSETS = useAssets(["BG_TES_KESEHATAN_MENTAL"]);
  return (
    <>
      <MentalHealthFormHead />
      <Box
        backgroundImage={ASSETS.BG_TES_KESEHATAN_MENTAL}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        backgroundPosition="center center"
      >
        <SimpleBlock pt={24} pb={96}>
          <Box maxW="470px">
            <Text
              as="h2"
              fontFamily="poppins"
              fontWeight="semibold"
              fontSize="38px"
              lineHeight="short"
              mb={3}
            >
              Cek Kondisi Kesehatan Mental Kamu
            </Text>
            <Text fontSize="xl" mb={4}>
              Kenali dan antisipasi risiko depresi
            </Text>
            <Button
              colorScheme="main"
              variant="solid"
              height="46px"
              borderRadius="4px"
              w="100%"
              maxW="274px"
              onClick={handleOpenTypeform}
            >
              Mulai
            </Button>
            <div ref={container} />
          </Box>
        </SimpleBlock>
      </Box>
      <Box marginBottom={10} marginTop={20}>
        <SehatQFooter {...props} />
      </Box>
    </>
  );
}
