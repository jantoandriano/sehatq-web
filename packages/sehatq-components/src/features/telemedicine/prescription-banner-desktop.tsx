import React from "react";
import { useAssets } from "@sehatq/utils";
import { Flex, Box, Text, Button, useImage } from "../../user-interfaces";
import { BuyPrescriptionPopup } from "./buy-prescription-popup";

export type PrescriptionBannerDesktopProps = {
  consultationId: string;
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export function PrescriptionBannerDesktop(
  props: PrescriptionBannerDesktopProps
) {
  const { consultationId, isOpen, onOpen, onClose } = props;
  const ASSETS = useAssets(["PRESCRIPTION"]);
  const Image = useImage();

  return (
    <>
      <Flex
        width="max-content"
        borderRadius="base"
        padding={4}
        position="absolute"
        bottom="16px"
        left="50%"
        transform="translateX(-50%)"
        background="sea.500"
        boxShadow="base"
        align="center"
      >
        <Image
          alt="prescription"
          src={ASSETS.PRESCRIPTION}
          height={36}
          width={36}
          layout="fixed"
        />
        <Box flex={1} marginLeft={3} marginRight={6}>
          <Text fontSize="xxs" color="white">
            Resep
          </Text>
          <Text fontSize="sm" fontWeight="semibold" color="white">
            Resep siap ditebus
          </Text>
        </Box>
        <Button
          size="sm"
          variant="unstyled"
          color="sea.500"
          background="white"
          width="72px"
          height={8}
          onClick={onOpen}
        >
          Lihat
        </Button>
      </Flex>
      <BuyPrescriptionPopup
        consultationId={consultationId}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
