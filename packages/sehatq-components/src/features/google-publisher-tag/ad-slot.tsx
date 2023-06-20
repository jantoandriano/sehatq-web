import React, { useEffect, useState } from "react";
import { useAtom } from "jotai";
import { Flex, Box, Text, IconButton, CloseIcon } from "../../user-interfaces";
import { gpt, getHeight, getWidth } from "./google-publisher-tag-utils";
import { readOnlyGQTAtom } from "./google-publisher-tag-atoms";

export interface AdSlotProps {
  divId: string;
  variant?: "normal" | "fixed" | "sticky" | "flying-carpet" | "billboard";
  bottom?: string;
}

function LoatingAds(props: {
  adElement: JSX.Element;
  stateIsClose: boolean;
  position: "fixed" | "sticky";
  bottom?: string;
  onClose: (isClose: boolean) => void;
}) {
  const { stateIsClose, bottom, adElement, position, onClose } = props;
  return stateIsClose ? null : (
    <Flex
      position={position}
      bottom={bottom || "0px"}
      left="0px"
      width="100vw"
      align="center"
      justify="center"
      backgroundColor="white"
      boxShadow="base"
      zIndex="banner"
    >
      {adElement}
      <IconButton
        aria-label="Close Advertisement"
        variant="solid"
        colorScheme="main"
        position="absolute"
        top="-10px"
        right="10px"
        isRound
        height="20px"
        minWidth="20px"
        boxShadow="base"
        icon={<CloseIcon w={2} h={2} />}
        onClick={() => onClose(true)}
      />
    </Flex>
  );
}

export function AdSlot(props: AdSlotProps) {
  const [stateIsClose, setStateIsClose] = useState(false);
  const { divId, bottom, variant = "normal" } = props;
  const [atomGPT] = useAtom(readOnlyGQTAtom);
  const ad = atomGPT.ads.find((ad) => "divId" in ad && ad.divId === divId);
  if (!ad && atomGPT.status !== "IDLE") {
    throw new Error(`[AdSlot]: ${divId} not found`);
  }
  useEffect(() => {
    if (divId && atomGPT.status === "SUCCESS") {
      gpt.showSlot(divId);
    }
  }, [divId, atomGPT.status]);
  const width = getWidth(ad && "size" in ad ? ad.size : null);
  const height = getHeight(ad && "size" in ad ? ad.size : null);
  const adElement = (
    <Box
      id={divId}
      fontSize="sm"
      backgroundColor="gray.500"
      width={width ? `${width}px` : undefined}
      minHeight={height ? `${height}px` : "40px"}
      position="relative"
    >
      <Text
        top="50%"
        left="50%"
        position="absolute"
        transform="translate(-50%, -50%)"
      >
        Advertisement
      </Text>
    </Box>
  );
  if (variant === "sticky" || variant === "fixed") {
    return (
      <LoatingAds
        position={variant}
        adElement={adElement}
        stateIsClose={stateIsClose}
        onClose={setStateIsClose}
        bottom={bottom}
      />
    );
  }
  if (variant === "flying-carpet") {
    return (
      <Box height="300px" width="100%" position="relative" overflow="hidden">
        <Box
          position="absolute"
          top="0px"
          left="0px"
          width="100%"
          height="100%"
          clipPath="polygon(0px 0px,100% 0px,100% 100%,0px 100%)"
        >
          <Flex
            position="fixed"
            top="0px"
            left="0px"
            width="100%"
            height="100%"
            display="flex"
            align="center"
            justify="center"
            direction="column"
          >
            {adElement}
          </Flex>
        </Box>
      </Box>
    );
  }
  if (variant === "billboard") {
    return stateIsClose ? null : (
      <>
        <Box
          backgroundColor="gray.500"
          height={`min(${height}px, 75vh)`}
          width="100%"
          position="relative"
          overflow="hidden"
        >
          <Box
            position="absolute"
            top="0px"
            left="0px"
            width="100%"
            height="100%"
            clipPath="polygon(0px 0px,100% 0px,100% 100%,0px 100%)"
          >
            <Flex
              position="fixed"
              top="0px"
              left="0px"
              width="100%"
              height="100%"
              display="flex"
              align="center"
              justify="start"
              direction="column"
            >
              {adElement}
            </Flex>
          </Box>
          <IconButton
            aria-label="Close Advertisement"
            variant="solid"
            colorScheme="main"
            position="absolute"
            top="10px"
            right="10px"
            isRound
            height="20px"
            minWidth="20px"
            boxShadow="base"
            icon={<CloseIcon w={2} h={2} />}
            onClick={() => setStateIsClose(true)}
          />
        </Box>
        <Text
          paddingY={1}
          backgroundColor="main.500"
          color="white"
          textAlign="center"
          fontSize="xs"
          fontWeight="semibold"
          fontFamily="poppins"
        >
          SCROLL UNTUK MELANJUTKAN MEMBACA
        </Text>
      </>
    );
  }
  return (
    <Flex width="100%" justifyContent="center">
      {adElement}
    </Flex>
  );
}
