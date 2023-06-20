import React from "react";
import {
  Box,
  HStack,
  Text,
  Flex,
  Skeleton,
  ChevronRightIcon,
  SehatQPdfIcon,
  Button,
  LightBox,
} from "../../user-interfaces";

export type PrescriptionImagesPopupDesktopProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  imageUrls?: string[];
};

export function PrescriptionImagesPopupDesktop(
  props: PrescriptionImagesPopupDesktopProps
) {
  const { onOpen, isOpen, onClose, imageUrls } = props;
  return (
    <>
      <Flex
        justify="space-between"
        boxShadow="base"
        borderRadius="xl"
        background="white"
        px={6}
        py={4}
        width="full"
      >
        <HStack spacing={3}>
          <Box
            borderRadius="base"
            background="iceBlue.500"
            boxSize="40px"
            alignItems="center"
            p={2}
          >
            <SehatQPdfIcon boxSize={6} />
          </Box>
          <Text
            fontSize="sm"
            color="charcoalGrey"
            fontWeight="semibold"
            fontFamily="poppins"
            lineHeight="4"
          >
            Lihat Foto Resep
          </Text>
        </HStack>
        <Button
          variant="fit"
          fontSize="sm"
          color="sea.500"
          fontWeight="semibold"
          lineHeight="4"
          rightIcon={<ChevronRightIcon boxSize={7} color="sea.500" />}
          onClick={onOpen}
        >
          Lihat Detail
        </Button>
      </Flex>
      {imageUrls?.length && (
        <LightBox isOpen={isOpen} onClose={onClose} imageUrls={imageUrls} />
      )}
    </>
  );
}

export function PrescriptionImagesPopupSkeletonDesktop() {
  return (
    <Flex
      justify="space-between"
      boxShadow="base"
      borderRadius="xl"
      background="white"
      align="center"
      px={6}
      py={4}
      width="full"
    >
      <HStack spacing={3}>
        <Box
          borderRadius="base"
          background="iceBlue.500"
          boxSize="40px"
          alignItems="center"
          p={2}
        >
          <SehatQPdfIcon boxSize={6} />
        </Box>
        <Skeleton width="124px" height="18px" />
      </HStack>
      <Skeleton width="120px" height="19px" />
    </Flex>
  );
}
