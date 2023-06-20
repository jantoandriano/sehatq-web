import React from "react";
import { useAssets, NavigationValue, useNavigation } from "@sehatq/utils";
import { Box, Text, LinkOverlay, Image, LinkBox } from "../../user-interfaces";

export interface MyMedicalRecordCardMobileProps {
  imgSrc?: string;
  textLabel: string;
  medicalRecordNavigation: NavigationValue;
}

export function MyMedicalRecordCardMobile(
  props: MyMedicalRecordCardMobileProps
) {
  const { textLabel, imgSrc, medicalRecordNavigation } = props;
  const { Navigate } = useNavigation();
  const ASSETS = useAssets(["BG_TES_KESEHATAN", "SEHATQ_SM"]);

  return (
    <LinkBox borderRadius={10} h={140} position="relative" overflow="hidden">
      <Box
        backgroundImage={imgSrc || ASSETS.BG_TES_KESEHATAN}
        backgroundRepeat="no-repeat"
        backgroundSize="cover"
        position="absolute"
        w="100%"
        h={140}
        bottom={0}
        left={0}
        borderRadius={10}
      />
      <Box
        backgroundImage="linear-gradient(to bottom, rgba(0, 0, 0, 0), #000)"
        position="absolute"
        w="100%"
        h={132}
        bottom={0}
        left={0}
      />
      <Box
        background="squash.500"
        position="absolute"
        w="14px"
        borderRadius={10}
        h="54px"
        bottom={17}
        left="-7px"
      />
      <Image
        alt="SehatQ Logo"
        src={ASSETS.SEHATQ_SM}
        position="absolute"
        top="8px"
        right="8px"
        w="35px"
        h="34px"
      />
      <Navigate name={medicalRecordNavigation.name}>
        <LinkOverlay>
          <Text
            color="white"
            fontFamily="poppins"
            fontWeight="semibold"
            position="absolute"
            zIndex={2}
            bottom={0}
            left={0}
            pl={5}
            pr={20}
            pb={5}
          >
            {textLabel}
          </Text>
        </LinkOverlay>
      </Navigate>
    </LinkBox>
  );
}
