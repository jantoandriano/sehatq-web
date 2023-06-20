import React from "react";
import { Box, Button, Text, SehatQFooter } from "@sehatq/components";
import { useAssets } from "@sehatq/utils";
import { MentalHealthFormHead } from "@components/head";

export type MentalHealthFormMobileProps = {
  isMobile: boolean;
  container: React.MutableRefObject<HTMLDivElement | null>;
  handleOpenTypeform: () => void;
};

export function MentalHealthFormMobile(props: MentalHealthFormMobileProps) {
  const { container, handleOpenTypeform } = props;
  const ASSETS = useAssets(["BG_TES_KESEHATAN_MENTAL"]);
  return (
    <>
      <MentalHealthFormHead />
      <Box
        backgroundImage={ASSETS.BG_TES_KESEHATAN_MENTAL}
        backgroundRepeat="no-repeat"
        backgroundSize="auto 410px"
        backgroundPosition="68% bottom"
        backgroundColor="#ddf7f2"
      >
        <Box px={4} pt="74px" pb={8} textAlign="center">
          <Text
            as="h2"
            fontFamily="poppins"
            fontWeight="semibold"
            fontSize="6xl"
            lineHeight="shorter"
            maxW={300}
            mx="auto"
            mb={4}
          >
            Cek Kondisi Kesehatan Mental Kamu
          </Text>
          <Text mb={274} maxW={170} mx="auto">
            Kenali dan antisipasi risiko depresi
          </Text>
          <Button
            colorScheme="main"
            variant="solid"
            height="46px"
            borderRadius="4px"
            w="100%"
            onClick={handleOpenTypeform}
          >
            Mulai
          </Button>
          <div ref={container} />
        </Box>
      </Box>
      <Box px={4}>
        <SehatQFooter {...props} />
      </Box>
    </>
  );
}
