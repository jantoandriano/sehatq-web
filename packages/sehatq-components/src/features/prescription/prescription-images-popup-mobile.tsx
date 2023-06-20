import React from "react";
import {
  Box,
  Flex,
  SehatQPdfIcon,
  ChevronRightIcon,
  Button,
  Skeleton,
  LightBox,
} from "../../user-interfaces";

export type PrescriptionImagesPopupMobileProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  imageUrls?: string[];
};

export function PrescriptionImagesPopupMobile(
  props: PrescriptionImagesPopupMobileProps
) {
  const { onOpen, isOpen, onClose, imageUrls } = props;
  return (
    <>
      <Button
        variant="fit"
        border="solid 0.5px"
        borderColor="veryLightPink"
        borderRadius="base"
        background="white"
        isFullWidth
        height="40px"
        fontSize="xs"
        lineHeight="5"
        color="charcoalGrey"
        fontWeight="semibold"
        justifyContent="space-between"
        py={0}
        pl={0}
        pr={2}
        onClick={onOpen}
        rightIcon={<ChevronRightIcon boxSize={6} color="charcoalGrey" />}
      >
        <Flex align="center">
          <Box
            borderLeftRadius="base"
            background="iceBlue.500"
            alignItems="center"
            p={2}
            mr={3}
          >
            <SehatQPdfIcon width={6} height={5} />
          </Box>
          Lihat Foto Resep
        </Flex>
      </Button>
      {imageUrls?.length && (
        <LightBox isOpen={isOpen} onClose={onClose} imageUrls={imageUrls} />
      )}
    </>
  );
}

export function PrescriptionImagesPopupSkeletonMobile() {
  return (
    <Button
      variant="fit"
      border="solid 0.5px"
      borderColor="veryLightPink"
      borderRadius="base"
      background="white"
      isFullWidth
      height="40px"
      fontSize="xs"
      lineHeight="5"
      color="charcoalGrey"
      fontWeight="semibold"
      justifyContent="space-between"
      py={0}
      pl={0}
      pr={2}
      rightIcon={<ChevronRightIcon boxSize={6} color="charcoalGrey" />}
    >
      <Flex align="center">
        <Box
          borderLeftRadius="base"
          background="iceBlue.500"
          alignItems="center"
          p={2}
          mr={3}
        >
          <SehatQPdfIcon width={6} height={5} />
        </Box>
        <Skeleton width="117px" height="20px" />
      </Flex>
    </Button>
  );
}
